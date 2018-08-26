import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUserProfile, updateUserProfile } from '../actions/user';
import {
  fetchUserWorkouts,
  updateWorkout,
  addWorkout,
  deleteWorkout,
} from '../actions/workout';
import { fetchUserTeam } from '../actions/team';
import UserInfo from '../components/UserInfo';
import SoloWorkoutFeed from '../components/SoloWorkoutFeed';
import LoadingScreen from '../components/mini/LoadingScreen';
import AddWorkoutForm from '../components/forms/AddWorkoutForm';

const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    user: state.auth.user,
    userProfile: state.user.userProfile,
    isFetchingUserProfile: state.user.isFetchingUserProfile,
    userProfileIsFetched: state.user.userProfileIsFetched,
    userProfileIsUpdated: state.user.userProfileIsUpdated,
    userWorkouts: state.workouts.list,
    isFetchingUserWorkouts: state.workouts.isFetchingUserWorkouts,
    userWorkoutsFetched: state.workouts.userWorkoutsFetched,
    workoutStatusText: state.workouts.statusText,
    workoutIsAdded: state.workouts.workoutIsAdded,
    team: state.team.team,
    isFetchingTeam: state.team.isFetchingTeam,
    teamIsFetched: state.team.teamIsFetched,
    isCoach: state.team.isCoach,
    isAuthenticated: state.auth.isAuthenticated,
    userDistTotal: state.workouts.userDistTotal,
  }
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddWorkoutModal: false,
    };

    this.onAddWorkoutModalOpen = this.onAddWorkoutModalOpen.bind(this);
    this.onAddWorkoutModalClose = this.onAddWorkoutModalClose.bind(this);
    this.onWorkoutDeleteClick = this.onWorkoutDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/signin');
    }

    this.props.fetchUserProfile(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUserProfile(this.props.match.params.userId);
      this.props.fetchUserTeam(this.props.match.params.userId);
      this.props.fetchUserWorkouts(this.props.match.params.userId);
    }
  }

  onWorkoutDeleteClick(workoutId, userId) {
    this.props.deleteWorkout(workoutId, userId);
  }

  onAddWorkoutModalOpen(event) {
    this.setState({ showAddWorkoutModal: true });
    document.body.classList.add('no-scroll');
  }

  onAddWorkoutModalClose(event) {
    this.setState({ showAddWorkoutModal: false });
    document.body.classList.remove('no-scroll');
  }

  render() {
    if (!this.props.userProfileIsFetched || !this.props.userWorkoutsFetched || !this.props.teamIsFetched) {
      return (
        <div className="profile-page">
          <LoadingScreen />
        </div>
      );
    } else {
      return (
        <div className="profile-page">
          <UserInfo
            user={this.props.userProfile}
            currentUserId={this.props.userId}
            isCoach={this.props.isCoach}
            team={this.props.team}
            updateUser={this.props.updateUserProfile}
            profileIsUpdated={this.props.userProfileIsUpdated}
          />
          {!this.props.isCoach &&
            <div className='workout-feed-container'>
              <SoloWorkoutFeed
                profileUserId={this.props.userProfile._id}
                isFetchingUserWorkouts={this.props.isFetchingUserWorkouts}
                isCoach={this.props.isCoach}
                onAddWorkoutModalOpen={this.onAddWorkoutModalOpen}
                onWorkoutDeleteClick={this.onWorkoutDeleteClick}
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
            </div>
          }
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchUserProfile, updateUserProfile, fetchUserWorkouts, addWorkout,
  updateWorkout, deleteWorkout, fetchUserTeam,
})(Profile));
