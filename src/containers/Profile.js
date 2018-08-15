import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser, updateUser } from '../actions/user';
import {
  fetchUserWorkouts,
  updateWorkout,
  addWorkout,
  deleteWorkout,
} from '../actions/workout';
import { fetchUserTeam } from '../actions/team';
import UserInfo from './UserInfo';
import SoloWorkoutFeed from '../components/SoloWorkoutFeed';
import AddWorkoutForm from './forms/AddWorkoutForm';

const mapStateToProps = state => (
  {
    currentUserId: localStorage.getItem('userId'),
    user: state.profile.user,
    userWorkouts: state.workouts.list,
    isFetchingUserWorkouts: state.workouts.isFetchingUserWorkouts,
    team: state.team.team,
    isCoach: state.team.isCoach,
    authenticated: state.auth.authenticated,
    userDistTotal: state.workouts.userDistTotal,
  }
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddWorkoutModal: false,
      distTotals: [
        { x: 'Erg', distance: ((this.props.user.ergTotal / 1000) || 0), fill: '#eda412' },
        { x: 'Row', distance: ((this.props.user.rowTotal / 1000) || 0), fill: '#2b85bc' },
      ],
    };

    this.onAddWorkoutModalOpen = this.onAddWorkoutModalOpen.bind(this);
    this.onAddWorkoutModalClose = this.onAddWorkoutModalClose.bind(this);
    this.onWorkoutDeleteClick = this.onWorkoutDeleteClick.bind(this);
    this.onAddTeamWorkoutModalOpen = this.onTeamWorkoutModalOpen.bind(this);
    this.onAddTeamWorkoutModalClose = this.onTeamWorkoutModalClose.bind(this);
    this.onTeamWorkoutDeleteClick = this.onTeamWorkoutDeleteClick.bind(this);
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onViewResultsModalOpen = this.onViewResultsModalOpen.bind(this);
    this.onViewResultsModalClose = this.onViewResultsModalClose.bind(this);
    this.onAddResultClick = this.onAddResultClick.bind(this);
    this.onResultDeleteClick = this.onResultDeleteClick.bind(this);
    this.onViewResultsClick = this.onViewResultsClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.history.replace('/signin');
    }

    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }

  async onResultDeleteClick(workoutId, teamWorkoutId) {
    await this.props.deleteResult(workoutId, teamWorkoutId);
    this.props.fetchTeamWorkout(teamWorkoutId);
  }

  async onWorkoutDeleteClick(workoutId, userId) {
    await this.props.deleteWorkout(workoutId, userId);
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }

  async onTeamWorkoutDeleteClick(workoutId, teamId) {
    await this.props.deleteTeamWorkout(workoutId, teamId);
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
  }

  async onAddResultClick(teamWorkoutId, prevProps) {
    await this.props.fetchTeamWorkout(teamWorkoutId);
    this.onAddResultModalOpen();
  }

  async onViewResultsClick(teamWorkoutId, type) {
    await this.props.fetchTeamWorkout(teamWorkoutId);

    if (type === 'distance') {
      await this.props.fetchTimeResults(teamWorkoutId);
    } else if (type === 'time') {
      await this.props.fetchDistResults(teamWorkoutId);
    }

    this.onViewResultsModalOpen();
  }

  onAddWorkoutModalOpen(event) {
    this.setState({ showAddWorkoutModal: true });
  }

  onAddWorkoutModalClose(event) {
    this.setState({ showAddWorkoutModal: false });
  }

  onTeamWorkoutModalOpen(event) {
    this.setState({ showAddTeamWorkoutModal: true });
  }

  onTeamWorkoutModalClose(event) {
    this.setState({ showAddTeamWorkoutModal: false });
  }

  onAddResultModalOpen(event) {
    this.setState({ showAddResultModal: true });
  }

  onAddResultModalClose(event) {
    this.setState({ showAddResultModal: false });
  }

  onViewResultsModalOpen(event) {
    this.setState({ showViewResultsModal: true });
  }

  onViewResultsModalClose(event) {
    this.setState({ showViewResultsModal: false });
  }

  render() {
    return (
      <div className="profile-page">
        <UserInfo user={this.props.user} team={this.props.team} updateUser={this.props.updateUser} />
        <div className='workout-feed-container'>
          <SoloWorkoutFeed
            profileUserId={this.props.user._id}
            isFetchingUserWorkouts={this.props.isFetchingUserWorkouts}
            isCoach={this.props.isCoach}
            onAddWorkoutModalOpen={this.onAddWorkoutModalOpen}
            onWorkoutDeleteClick={this.onWorkoutDeleteClick}
            soloWorkouts={this.props.userWorkouts}
            currentUserId={this.props.currentUserId}
            updateWorkout={this.props.updateWorkout}
          />
          <ReactModal
            isOpen={this.state.showAddWorkoutModal}
            contentLabel="Add Workout"
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
          >
            <AddWorkoutForm
              addWorkout={this.props.addWorkout}
              userId={this.props.match.params.userId}
              userName={this.props.user.name}
              onModalClose={this.onAddWorkoutModalClose}
            />
          </ReactModal>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchUser, updateUser, fetchUserWorkouts, addWorkout,
  updateWorkout, deleteWorkout, fetchUserTeam,
})(Profile));
