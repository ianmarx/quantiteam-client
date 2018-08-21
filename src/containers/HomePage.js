import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser } from '../actions/user';
import {
  fetchUserWorkouts,
  fetchSoloWorkouts,
  updateWorkout,
  addWorkout,
  deleteWorkout,
} from '../actions/workout';
import { fetchUserTeam } from '../actions/team';
import {
  addTeamWorkout,
  fetchTeamWorkouts,
  updateTeamWorkout,
  deleteTeamWorkout,
  addResult,
  matchAthlete,
  deleteResult,
  updateResult,
  fetchTeamWorkout,
  fetchTimeResults,
  fetchDistResults,
} from '../actions/teamworkout';
import WorkoutFeed from '../components/WorkoutFeed';
import ResultsView from '../components/ResultsView';
import AddWorkoutForm from '../components/forms/AddWorkoutForm';
import AddResultForm from '../components/forms/AddResultForm';
import AddTeamWorkoutForm from '../components/forms/AddTeamWorkoutForm';
import LoadingScreen from '../components/mini/LoadingScreen';

const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    user: state.auth.user,
    isFetchingUser: state.auth.isFetchingUser,
    userIsFetched: state.auth.userIsFetched,
    teamSoloWorkouts: state.workouts.list,
    workoutIsAdded: state.workouts.workoutIsAdded,
    isFetchingSoloWorkouts: state.workouts.isFetchingSoloWorkouts,
    soloWorkoutsFetched: state.workouts.soloWorkoutsFetched,
    workoutStatusText: state.workouts.statusText,
    team: state.team.team,
    isFetchingTeam: state.team.isFetchingTeam,
    teamIsFetched: state.team.teamIsFetched,
    isCoach: state.team.isCoach,
    isAuthenticated: state.auth.isAuthenticated,
    teamWorkouts: state.teamWorkouts.list,
    isFetchingTeamWorkouts: state.teamWorkouts.isFetchingTeamWorkouts,
    teamWorkoutsFetched: state.teamWorkouts.teamWorkoutsFetched,
    currentTeamWorkout: state.teamWorkouts.currentTeamWorkout,
    isFetchingTeamWorkout: state.teamWorkouts.isFetchingTeamWorkout,
    isFetchingResults: state.teamWorkouts.isFetchingResults,
    currentResults: state.teamWorkouts.currentResults,
    queryResults: state.user.queryResults,
  }
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTeamWorkoutModal: false,
      showAddWorkoutModal: false,
      showAddResultModal: false,
      showViewResultsModal: false,
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
    if (!this.props.team) {
      this.props.fetchUserTeam(this.props.userId);
    }
    if (!this.props.teamWorkouts) {
      this.props.fetchTeamWorkouts(this.props.userId);
    }
    if (!this.props.soloWorkouts) {
      this.props.fetchSoloWorkouts(this.props.userId);
    }
  }

  onResultDeleteClick(workoutId, teamWorkoutId) {
    this.props.deleteResult(workoutId, teamWorkoutId);
  }

  onWorkoutDeleteClick(workoutId, userId) {
    this.props.deleteWorkout(workoutId, userId);
  }

  onTeamWorkoutDeleteClick(workoutId, teamId) {
    this.props.deleteTeamWorkout(workoutId, teamId);
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
    document.body.classList.add('no-scroll');
  }

  onAddWorkoutModalClose(event) {
    this.setState({ showAddWorkoutModal: false });
    document.body.classList.remove('no-scroll');
  }

  onTeamWorkoutModalOpen(event) {
    this.setState({ showAddTeamWorkoutModal: true });
    document.body.classList.add('no-scroll');
  }

  onTeamWorkoutModalClose(event) {
    this.setState({ showAddTeamWorkoutModal: false });
    document.body.classList.remove('no-scroll');
  }

  onAddResultModalOpen(event) {
    this.setState({ showAddResultModal: true });
    document.body.classList.add('no-scroll');
  }

  onAddResultModalClose(event) {
    this.setState({ showAddResultModal: false });
    document.body.classList.remove('no-scroll');
  }

  onViewResultsModalOpen(event) {
    this.setState({ showViewResultsModal: true });
    document.body.classList.add('no-scroll');
  }

  onViewResultsModalClose(event) {
    this.setState({ showViewResultsModal: false });
    document.body.classList.remove('no-scroll');
  }

  render() {
    if (!this.props.userIsFetched || !this.props.teamIsFetched || !this.props.soloWorkoutsFetched || !this.props.teamWorkoutsFetched) {
      return (
        <div className="home-page">
          <LoadingScreen />
        </div>
      );
    } else {
      return (
        <div className="home-page">
          <div className='workout-feed-container'>
            <WorkoutFeed
              isFetchingSoloWorkouts={this.props.isFetchingSoloWorkouts}
              isFetchingTeamWorkouts={this.props.isFetchingTeamWorkouts}
              isCoach={this.props.isCoach}
              onAddWorkoutModalOpen={this.onAddWorkoutModalOpen}
              onAddTeamWorkoutModalOpen={this.onAddTeamWorkoutModalOpen}
              onAddResultClick={this.onAddResultClick}
              onViewResultsClick={this.onViewResultsClick}
              onWorkoutDeleteClick={this.onWorkoutDeleteClick}
              onTeamWorkoutDeleteClick={this.onTeamWorkoutDeleteClick}
              soloWorkouts={this.props.teamSoloWorkouts}
              teamWorkouts={this.props.teamWorkouts}
              teamName={this.props.team.name}
              currentUserId={this.props.userId}
              updateWorkout={this.props.updateWorkout}
              updateResult={this.props.updateResult}
              updateTeamWorkout={this.props.updateTeamWorkout}
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
                userId={this.props.userId}
                userName={this.props.user.name}
                onModalClose={this.onAddWorkoutModalClose}
                statusText={this.props.workoutStatusText}
                workoutIsAdded={this.props.workoutIsAdded}
              />
            </ReactModal>
            <ReactModal
              isOpen={this.state.showViewResultsModal}
              className="modal"
              overlayClassName="overlay"
              ariaHideApp={false}
              onRequestClose={this.onViewResultsModalClose}
            >
              {!this.props.isFetchingResults &&
                <div className='results-modal-container'>
                  <ResultsView
                    isCoach={this.props.isCoach}
                    results={this.props.currentResults}
                    teamWorkout={this.props.currentTeamWorkout}
                    onDeleteClick={this.onResultDeleteClick}
                    fetchDistResults={this.props.fetchDistResults}
                    fetchTimeResults={this.props.fetchTimeResults}
                    updateResult={this.props.updateResult}
                    onModalClose={this.onViewResultsModalClose}
                  />
                </div>
              }
            </ReactModal>
            <ReactModal
              isOpen={this.state.showAddTeamWorkoutModal}
              contentLabel="Add Team Workout"
              className="modal"
              overlayClassName="overlay"
              ariaHideApp={false}
              onRequestClose={this.onAddTeamWorkoutModalClose}
            >
              <AddTeamWorkoutForm
                addTeamWorkout={this.props.addTeamWorkout}
                userId={this.props.userId}
                teamId={this.props.team._id}
                onModalClose={this.onAddTeamWorkoutModalClose}
              />
            </ReactModal>
            <ReactModal
              isOpen={this.state.showAddResultModal}
              contentLabel="Add Result"
              className="modal"
              overlayClassName="overlay"
              ariaHideApp={false}
              onRequestClose={this.onAddResultModalClose}
            >
              {!this.props.isFetchingTeamWorkout &&
                <AddResultForm
                  teamWorkout={this.props.currentTeamWorkout}
                  addResult={this.props.addResult}
                  userId={this.props.userId}
                  matchAthlete={this.props.matchAthlete}
                  queryResults={this.props.queryResults}
                  fetchTeamWorkout={this.props.fetchTeamWorkout}
                  onModalClose={this.onAddResultModalClose}
                />
              }
            </ReactModal>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    fetchUser, fetchUserWorkouts,
    updateWorkout, fetchUserTeam, addWorkout, deleteWorkout, fetchSoloWorkouts,
    addTeamWorkout, fetchTeamWorkouts, fetchTeamWorkout, updateTeamWorkout,
    deleteTeamWorkout, addResult, fetchDistResults, fetchTimeResults, matchAthlete,
    deleteResult, updateResult,
  },
)(HomePage));
