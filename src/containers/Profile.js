import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { fetchUser, fetchUserProfile, updateUserProfile } from '../actions/user';
import {
  fetchUserWorkouts,
  updateWorkout,
  addWorkout,
  deleteWorkout,
} from '../actions/workout';
import { fetchUserTeam } from '../actions/team';
import UserInfo from '../components/UserInfo';
import SoloWorkoutFeed from '../components/SoloWorkoutFeed';
import LoadingPage from '../components/mini/LoadingPage';
import AddWorkoutForm from '../components/forms/AddWorkoutForm';
import PageFooter from '../components/mini/PageFooter';

export const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    userIsFetched: state.auth.userIsFetched,
    userProfile: state.user.userProfile,
    isFetchingUserProfile: state.user.isFetchingUserProfile,
    userProfileIsFetched: state.user.userProfileIsFetched,
    userProfileIsUpdated: state.user.userProfileIsUpdated,
    userWorkouts: state.workouts.userList,
    isFetchingUserWorkouts: state.workouts.isFetchingUserWorkouts,
    userWorkoutsFetched: state.workouts.userWorkoutsFetched,
    workoutStatusText: state.workouts.statusText,
    workoutIsAdded: state.workouts.workoutIsAdded,
    team: state.team.team,
    isFetchingTeam: state.team.isFetchingTeam,
    teamIsFetched: state.team.teamIsFetched,
    isCoach: state.team.isCoach,
  }
);

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddWorkoutModal: false,
    };

    this.onAddWorkoutModalOpen = this.onAddWorkoutModalOpen.bind(this);
    this.onAddWorkoutModalClose = this.onAddWorkoutModalClose.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/signin');
    }
    if (!this.props.userProfileIsFetched || this.props.match.params.userId !== this.props.userId) {
      this.props.fetchUserProfile(this.props.match.params.userId);
    }
    if (!this.props.teamIsFetched) {
      this.props.fetchUserTeam(this.props.match.params.userId);
    }
    if (!this.props.userWorkoutsFetched || this.props.match.params.userId !== this.props.userId) {
      this.props.fetchUserWorkouts(this.props.match.params.userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUserProfile(this.props.match.params.userId);
      this.props.fetchUserTeam(this.props.match.params.userId);
      this.props.fetchUserWorkouts(this.props.match.params.userId);
    }
  }

  onAddWorkoutModalOpen(event) {
    this.setState({ showAddWorkoutModal: true });
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  onAddWorkoutModalClose(event) {
    this.setState({ showAddWorkoutModal: false });
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  render() {
    if (!this.props.userProfileIsFetched || !this.props.userWorkoutsFetched || !this.props.teamIsFetched) {
      return (
        <LoadingPage />
      );
    } else {
      return (
        <div className="profile-page-container">
          <UserInfo
            user={this.props.userProfile}
            currentUserId={this.props.userId}
            isCoach={this.props.isCoach}
            team={this.props.team}
            updateUser={this.props.updateUserProfile}
            profileIsUpdated={this.props.userProfileIsUpdated}
          />
          {(!this.props.isCoach || this.props.userId !== this.props.match.params.userId) &&
            <React.Fragment>
              <SoloWorkoutFeed
                profileUserId={this.props.userProfile._id}
                isFetchingUserWorkouts={this.props.isFetchingUserWorkouts}
                isCoach={this.props.isCoach}
                onAddWorkoutModalOpen={this.onAddWorkoutModalOpen}
                deleteWorkout={this.props.deleteWorkout}
                soloWorkouts={this.props.userWorkouts}
                currentUserId={this.props.userId}
                updateWorkout={this.props.updateWorkout}
              />
              <ReactModal
                isOpen={this.state.showAddWorkoutModal}
                contentLabel="Add Workout"
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
                onRequestClose={this.onAddWorkoutModalClose}
              >
                <AddWorkoutForm
                  addWorkout={this.props.addWorkout}
                  userId={this.props.userProfile._id}
                  userName={this.props.userProfile.name}
                  onModalClose={this.onAddWorkoutModalClose}
                  workoutIsAdded={this.props.workoutIsAdded}
                  statusText={this.props.workoutStatusText}
                />
              </ReactModal>
            </React.Fragment>
          }
          <PageFooter />
        </div>
      );
    }
  }
}

Profile.propTypes = {
  userId: PropTypes.string,
  user: PropTypes.object,
  userProfile: PropTypes.object,
  isFetchingUserProfile: PropTypes.bool,
  userProfileIsFetched: PropTypes.bool,
  userProfileIsUpdated: PropTypes.bool,
  userWorkouts: PropTypes.array,
  isFetchingUserWorkouts: PropTypes.bool,
  userWorkoutsFetched: PropTypes.bool,
  workoutStatusText: PropTypes.string,
  team: PropTypes.object,
  isFetchingTeam: PropTypes.bool,
  teamIsFetched: PropTypes.bool,
  isCoach: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps, {
  fetchUser, fetchUserProfile, updateUserProfile, fetchUserWorkouts, addWorkout,
  updateWorkout, deleteWorkout, fetchUserTeam,
})(Profile));
