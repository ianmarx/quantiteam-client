import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser } from '../actions/user';
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
import TeamWorkoutFeed from '../components/TeamWorkoutFeed';
import ResultsView from '../components/ResultsView';
import AddResultForm from './forms/AddResultForm';
import AddTeamWorkoutForm from './forms/AddTeamWorkoutForm';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    team: state.team.team,
    isCoach: state.team.isCoach,
    authenticated: state.auth.authenticated,
    teamWorkouts: state.teamWorkouts.list,
    isFetchingTeamWorkouts: state.teamWorkouts.isFetchingTeamWorkouts,
    currentTeamWorkout: state.teamWorkouts.currentTeamWorkout,
    currentResults: state.teamWorkouts.currentResults,
    isFetchingTeamWorkout: state.teamWorkouts.isFetchingTeamWorkout,
    isFetchingResults: state.teamWorkouts.isFetchingResults,
    queryResults: state.profile.queryResults,
  }
);

class TeamProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddResultModal: false,
      showViewResultsModal: false,
      showAddTeamWorkoutModal: false,
      showRoster: true,
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
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
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

  render() {
    return (
      <div className="team-page">
        <div className="team-column">
          <TeamInfo team={this.props.team} />
        </div>
        <div className="team-column">
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
                  matchAthlete={this.props.matchAthlete}
                  queryResults={this.props.queryResults}
                  onModalClose={this.onAddResultModalClose}
                />
              }
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchUser, fetchUserTeam, fetchTeamWorkouts, addTeamWorkout,
  updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, fetchDistResults, fetchTeamWorkout,
  fetchTimeResults, deleteResult, updateWorkout, updateResult,
})(TeamProfile));
