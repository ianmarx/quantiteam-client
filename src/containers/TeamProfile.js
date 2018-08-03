import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchUser, fetchUserTeam, fetchTeamWorkouts, updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, queryResults,
  fetchDistResults, fetchTeamWorkout, fetchTimeResults, deleteResult, updateWorkout, addTeamWorkout,
} from '../actions';
import TeamInfo from '../components/TeamInfo';
import TeamWorkoutFeedContainer from './TeamWorkoutFeedContainer';

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
          <TeamWorkoutFeedContainer
            addResult={this.props.addResult}
            addTeamWorkout={this.props.addTeamWorkout}
            matchAthlete={this.props.matchAthlete}
            queryResults={this.props.queryResults}
            currentTeamWorkout={this.props.currentTeamWorkout}
            currentResults={this.props.currentResults}
            deleteResult={this.props.deleteResult}
            deleteTeamWorkout={this.props.deleteTeamWorkout}
            fetchDistResults={this.props.fetchDistResults}
            fetchTimeResults={this.props.fetchTimeResults}
            fetchUser={this.props.fetchUser}
            fetchUserWorkouts={this.props.fetchUserWorkouts}
            fetchTeamWorkouts={this.props.fetchTeamWorkouts}
            fetchTeamWorkout={this.props.fetchTeamWorkout}
            isCoach={this.props.isCoach}
            teamWorkouts={this.props.teamWorkouts}
            team={this.props.team}
            userId={this.props.match.params.userId}
            updateWorkout={this.props.updateWorkout}
            updateTeamWorkout={this.props.updateTeamWorkout}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchUser, fetchUserTeam, fetchTeamWorkouts, addTeamWorkout,
  updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, queryResults, fetchDistResults, fetchTeamWorkout,
  fetchTimeResults, deleteResult, updateWorkout,
})(TeamProfile));
