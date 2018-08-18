import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import {
  updateWorkout,
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
import TeamInfo from '../components/TeamInfo';
import TeamRoster from '../components/mini/TeamRoster';
import TeamWorkoutFeed from '../components/TeamWorkoutFeed';
import ResultsView from '../components/ResultsView';
import AddResultForm from './forms/AddResultForm';
import AddTeamWorkoutForm from './forms/AddTeamWorkoutForm';
import LoadingScreen from '../components/mini/LoadingScreen';

const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    user: state.auth.user,
    team: state.team.team,
    isFetchingTeam: state.team.isFetchingTeam,
    teamIsFetched: state.team.teamIsFetched,
    isCoach: state.team.isCoach,
    isAuthenticated: state.auth.isAuthenticated,
    teamWorkouts: state.teamWorkouts.list,
    isFetchingTeamWorkouts: state.teamWorkouts.isFetchingTeamWorkouts,
    teamWorkoutsFetched: state.teamWorkouts.teamWorkoutsFetched,
    currentTeamWorkout: state.teamWorkouts.currentTeamWorkout,
    currentResults: state.teamWorkouts.currentResults,
    isFetchingTeamWorkout: state.teamWorkouts.isFetchingTeamWorkout,
    isFetchingResults: state.teamWorkouts.isFetchingResults,
    queryResults: state.user.queryResults,
  }
);

class TeamProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddResultModal: false,
      showViewResultsModal: false,
      showAddTeamWorkoutModal: false,
      showTeamRosterModal: false,
    };

    this.onViewResultsClick = this.onViewResultsClick.bind(this);
    this.onViewResultsModalOpen = this.onViewResultsModalOpen.bind(this);
    this.onViewResultsModalClose = this.onViewResultsModalClose.bind(this);
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onAddTeamWorkoutModalOpen = this.onAddTeamWorkoutModalOpen.bind(this);
    this.onAddTeamWorkoutModalClose = this.onAddTeamWorkoutModalClose.bind(this);
    this.onTeamWorkoutDeleteClick = this.onTeamWorkoutDeleteClick.bind(this);
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onViewResultsModalOpen = this.onViewResultsModalOpen.bind(this);
    this.onViewResultsModalClose = this.onViewResultsModalClose.bind(this);
    this.onTeamRosterModalOpen = this.onTeamRosterModalOpen.bind(this);
    this.onTeamRosterModalClose = this.onTeamRosterModalClose.bind(this);
    this.onAddResultClick = this.onAddResultClick.bind(this);
    this.onResultDeleteClick = this.onResultDeleteClick.bind(this);
    this.onViewResultsClick = this.onViewResultsClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/signin');
    }
    if (!this.props.teamIsFetched) {
      this.props.fetchUserTeam(this.props.userId);
    }
    this.props.fetchTeamWorkouts(this.props.userId);
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

  onResultDeleteClick(workoutId, teamWorkoutId) {
    this.props.deleteResult(workoutId, teamWorkoutId);
  }

  onTeamWorkoutDeleteClick(workoutId, teamId) {
    this.props.deleteTeamWorkout(workoutId, teamId);
  }

  onAddTeamWorkoutModalOpen(event) {
    this.setState({ showAddTeamWorkoutModal: true });
  }

  onAddTeamWorkoutModalClose(event) {
    this.setState({ showAddTeamWorkoutModal: false });
  }

  async onAddResultClick(teamWorkoutId, prevProps) {
    await this.props.fetchTeamWorkout(teamWorkoutId);
    this.onAddResultModalOpen();
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

  onTeamRosterModalOpen(event) {
    this.setState({ showTeamRosterModal: true });
  }

  onTeamRosterModalClose(event) {
    this.setState({ showTeamRosterModal: false });
  }

  render() {
    if (!this.props.teamIsFetched || !this.props.teamWorkoutsFetched) {
      return (
        <div className="team-page">
          <LoadingScreen />
        </div>
      );
    } else {
      return (
        <div className="team-page">
          <TeamInfo
            team={this.props.team}
            isCoach={this.props.isCoach}
            onViewRosterClick={this.onTeamRosterModalOpen}
          />
          <div className='workout-feed-container'>
            <TeamWorkoutFeed
              isFetchingTeamWorkouts={this.props.isFetchingTeamWorkouts}
              isCoach={this.props.isCoach}
              onAddTeamWorkoutModalOpen={this.onAddTeamWorkoutModalOpen}
              onAddResultClick={this.onAddResultClick}
              onViewResultsClick={this.onViewResultsClick}
              onTeamWorkoutDeleteClick={this.onTeamWorkoutDeleteClick}
              teamWorkouts={this.props.teamWorkouts}
              updateWorkout={this.props.updateWorkout}
              updateTeamWorkout={this.props.updateTeamWorkout}
            />
            <ReactModal
              isOpen={this.state.showViewResultsModal}
              className="modal"
              overlayClassName="overlay"
              ariaHideApp={false}
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
            >
              {!this.props.isFetchingTeamWorkout &&
                <AddResultForm
                  teamWorkout={this.props.currentTeamWorkout}
                  addResult={this.props.addResult}
                  matchAthlete={this.props.matchAthlete}
                  queryResults={this.props.queryResults}
                  onModalClose={this.onAddResultModalClose}
                />
              }
            </ReactModal>
            <ReactModal
              isOpen={this.state.showTeamRosterModal}
              contentLabel={`${this.props.team.name} Roster`}
              className="modal"
              overlayClassName="overlay"
              ariaHideApp={false}
            >
              <TeamRoster
                coaches={this.props.team.coaches}
                athletes={this.props.team.athletes}
                onCloseRosterClick={this.onTeamRosterModalClose}
              />
            </ReactModal>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchUserTeam, fetchTeamWorkouts, addTeamWorkout,
  updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, fetchDistResults, fetchTeamWorkout,
  fetchTimeResults, deleteResult, updateWorkout, updateResult,
})(TeamProfile));
