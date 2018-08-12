import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser } from '../actions/user';
import {
  fetchUserWorkouts,
  fetchTeamSoloWorkouts,
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
import AddWorkoutForm from './forms/AddWorkoutForm';
import AddResultForm from './forms/AddResultForm';
import AddTeamWorkoutForm from './forms/AddTeamWorkoutForm';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    teamSoloWorkouts: state.workouts.list,
    team: state.team.team,
    isCoach: state.team.isCoach,
    authenticated: state.auth.authenticated,
    teamWorkouts: state.teamWorkouts.list,
    currentTeamWorkout: state.teamWorkouts.currentTeamWorkout,
    isFetchingTeamWorkout: state.teamWorkouts.isFetchingTeamWorkout,
    isFetchingResults: state.teamWorkouts.isFetchingResults,
    currentResults: state.teamWorkouts.currentResults,
    queryResults: state.profile.queryResults,
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
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
    this.props.fetchTeamSoloWorkouts(this.props.match.params.userId);
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
    if (!this.props.user.team) {
      return (
        <div>Error 404: Team not found.</div>
      );
    }

    return (
      <div className="home-page">
        <div className='workout-feed-container'>
          <WorkoutFeed
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
            userId={this.props.match.params.userId}
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
          >
            <AddWorkoutForm
              addWorkout={this.props.addWorkout}
              userId={this.props.match.params.userId}
              userName={this.props.user.name}
              onModalClose={this.onAddWorkoutModalClose}
            />
          </ReactModal>
          <ReactModal
            isOpen={this.state.showViewResultsModal}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
          >
            {!this.props.isFetchingResults &&
              <div className='results-modal-container'>
                <ResultsView
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
          >
            <AddTeamWorkoutForm
              addTeamWorkout={this.props.addTeamWorkout}
              userId={this.props.match.params.userId}
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
          >
            {!this.props.isFetchingTeamWorkout &&
              <AddResultForm
                teamWorkout={this.props.currentTeamWorkout}
                addResult={this.props.addResult}
                userId={this.props.match.params.userId}
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

export default withRouter(connect(
  mapStateToProps,
  {
    fetchUser, fetchUserWorkouts,
    updateWorkout, fetchUserTeam, addWorkout, deleteWorkout, fetchTeamSoloWorkouts,
    addTeamWorkout, fetchTeamWorkouts, fetchTeamWorkout, updateTeamWorkout,
    deleteTeamWorkout, addResult, fetchDistResults, fetchTimeResults, matchAthlete,
    deleteResult, updateResult,
  },
)(HomePage));
