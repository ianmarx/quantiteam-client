import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import {
  fetchUser, fetchUserTeam, fetchTeamWorkouts, updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, queryResults,
  fetchDistResults, fetchTeamWorkout, fetchTimeResults, deleteResult, updateWorkout,
} from '../actions';
import AddTeamWorkoutForm from './forms/AddTeamWorkout';
import AddResultForm from './forms/AddResult';
import TeamWorkoutPost from './TeamWorkoutPost';
import ResultsView from '../components/ResultsView';
import TeamInfo from '../components/TeamInfo';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    team: state.team.team,
    isCoach: state.team.isCoach,
    authenticated: state.auth.authenticated,
    teamWorkouts: state.teamWorkouts.list,
    currentTeamWorkout: state.teamWorkouts.current,
    currentResults: state.teamWorkouts.results,
    queryResults: state.profile.queryResults,
  }
);

class TeamProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeamWorkoutModal: false,
      showAddResultModal: false,
      showViewResultModal: false,
      showAddTeamWorkoutModal: false,
      showRoster: true,
    };
    this.onViewResultsClickBound = this.onViewResultsClick.bind(this);
    this.onViewResultsModalOpenBound = this.onViewResultsModalOpen.bind(this);
    this.onViewResultsModalCloseBound = this.onViewResultsModalClose.bind(this);
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onResultAddClick = this.onResultAddClick.bind(this);
  }
  async componentDidMount() {
    if (!this.props.authenticated) {
      this.props.history.replace('/signin');
    }
    await this.props.fetchUser(this.props.match.params.userId);
    await this.props.fetchUserTeam(this.props.match.params.userId);
    await this.props.fetchTeamWorkouts(this.props.match.params.userId);
  }

  async onViewResultsClick(teamWorkoutId, type) {
    await this.props.fetchTeamWorkout(teamWorkoutId);

    if (type === 'distance') {
      await this.props.fetchTimeResults(teamWorkoutId);
    } else if (type === 'time') {
      await this.props.fetchDistResults(teamWorkoutId);
    }
    this.onViewResultsModalOpenBound();
  }

  async onResultAddClick(teamWorkoutId) {
    await this.props.fetchTeamWorkout(teamWorkoutId);
    this.setState({ showAddResultModal: true });
  }

  async onResultDeleteClick(workoutId, teamWorkoutId) {
    await this.props.deleteResult(workoutId, teamWorkoutId);
  }

  onAddResultModalOpen(event) {
    this.setState({ showAddResultModal: true });
  }
  onAddResultModalClose(event) {
    this.setState({ showAddResultModal: false });
  }

  onViewResultsModalOpen(event) {
    this.setState({ showViewResultModal: true });
  }

  onViewResultsModalClose(event) {
    this.setState({ showViewResultModal: false });
  }

  render() {
    return (
      <div className="team-page">
        <div className="team-column">
          <TeamInfo team={this.props.team} />
        </div>
        <div className="team-column">
          <div className="workout-feed">
            <div id="feed-title">Team Workouts</div>
            {this.props.teamWorkouts.map((workout) => {
              return (
                <TeamWorkoutPost userId={workout._creator}
                  teamWorkout={workout}
                  key={workout.date}
                  isCoach={this.props.isCoach}
                  onDeleteClick={this.onTeamWorkoutDeleteClick}
                  updateTeamWorkout={this.props.updateTeamWorkout}
                  fetchTeamWorkout={this.props.fetchTeamWorkout}
                  onResultAddClick={this.onResultAddClick}
                  onViewResultsClick={this.onViewResultsClickBound}
                />
              );
            })}
          </div>
        </div>
        <ReactModal
          isOpen={this.state.showAddTeamWorkoutModal}
          contentLabel="Add Team Workout"
          className="modal"
          overlayClassName="overlay"
        >
          <AddTeamWorkoutForm
            addTeamWorkout={this.props.addTeamWorkout}
            userId={this.props.match.params.userId}
            teamId={this.props.team._id}
            onModalClose={this.onTeamWorkoutModalClose}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.showAddResultModal}
          contentLabel="Add Result"
          className="modal"
          overlayClassName="overlay"
        >
          {this.props.currentTeamWorkout._id !== undefined &&
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
          isOpen={this.state.showViewResultModal}
          contentLabel="Workout Results"
          className="modal"
          overlayClassName="overlay"
        >
          <div className='results-modal-container'>
            <ResultsView
              results={this.props.currentResults}
              teamWorkout={this.props.currentTeamWorkout}
              type={this.props.currentTeamWorkout.type}
              deleteResult={this.props.deleteResult}
              fetchDistResults={this.props.fetchDistResults}
              fetchTimeResults={this.props.fetchTimeResults}
              updateWorkout={this.props.updateWorkout}
              onModalClose={this.onViewResultsModalCloseBound}
            />
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchUser, fetchUserTeam, fetchTeamWorkouts,
  updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, queryResults, fetchDistResults, fetchTeamWorkout,
  fetchTimeResults, deleteResult, updateWorkout,
})(TeamProfile));
