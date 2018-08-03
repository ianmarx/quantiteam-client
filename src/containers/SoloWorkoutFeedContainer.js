import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import SoloWorkoutFeed from '../components/SoloWorkoutFeed';
import AddWorkoutForm from './forms/AddWorkout';

class WorkoutFeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddWorkoutModal: false,
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

  async onResultDeleteClick(workoutId, teamWorkoutId) {
    await this.props.deleteResult(workoutId, teamWorkoutId);
    this.props.fetchTeamWorkout(teamWorkoutId);
  }

  async onWorkoutDeleteClick(workoutId, userId) {
    await this.props.deleteWorkout(workoutId, userId);
    this.props.fetchUser(this.props.userId);
    this.props.fetchUserWorkouts(this.props.userId);
  }

  async onTeamWorkoutDeleteClick(workoutId, teamId) {
    await this.props.deleteTeamWorkout(workoutId, teamId);
    this.props.fetchTeamWorkouts(this.props.userId);
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
      <div className='workout-feed-container'>
        <SoloWorkoutFeed
          isCoach={this.props.isCoach}
          onAddWorkoutModalOpen={this.onAddWorkoutModalOpen}
          onWorkoutDeleteClick={this.onWorkoutDeleteClick}
          soloWorkouts={this.props.soloWorkouts}
          team={this.props.team}
          userId={this.props.userId}
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
            userId={this.props.userId}
            onModalClose={this.onAddWorkoutModalClose}
          />
        </ReactModal>
      </div>
    );
  }
}

export default WorkoutFeedContainer;

WorkoutFeedContainer.propTypes = {
  addWorkout: PropTypes.func,
  addResult: PropTypes.func,
  addTeamWorkout: PropTypes.func,
  matchAthlete: PropTypes.func,
  queryResults: PropTypes.array,
  currentTeamWorkout: PropTypes.object,
  currentResults: PropTypes.array,
  deleteResult: PropTypes.func,
  deleteWorkout: PropTypes.func,
  deleteTeamWorkout: PropTypes.func,
  fetchDistResults: PropTypes.func,
  fetchTimeResults: PropTypes.func,
  fetchUser: PropTypes.func,
  fetchUserWorkouts: PropTypes.func,
  fetchTeamWorkouts: PropTypes.func,
  fetchTeamWorkout: PropTypes.func,
  isCoach: PropTypes.bool,
  soloWorkouts: PropTypes.array,
  teamWorkouts: PropTypes.array,
  team: PropTypes.object,
  userId: PropTypes.string,
  updateTeamWorkout: PropTypes.func,
};
