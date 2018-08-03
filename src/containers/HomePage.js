import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchUser, fetchUserWorkouts, fetchTeamSoloWorkouts,
  updateWorkout, fetchUserTeam, addWorkout, deleteWorkout,
  addTeamWorkout, fetchTeamWorkouts, fetchTeamWorkout, updateTeamWorkout, deleteTeamWorkout,
  addResult, fetchDistResults, fetchTimeResults, matchAthlete, deleteResult,
} from '../actions';
import WorkoutFeedContainer from './WorkoutFeedContainer';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.teamList,
    team: state.team.team,
    isCoach: state.team.isCoach,
    authenticated: state.auth.authenticated,
    teamWorkouts: state.teamWorkouts.list,
    currentTeamWorkout: state.teamWorkouts.current,
    currentResults: state.teamWorkouts.results,
    queryResults: state.profile.queryResults,
  }
);

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
    this.props.fetchTeamSoloWorkouts(this.props.match.params.userId);
  }

  render() {
    if (!this.props.user.team) {
      return (
        <div>Error 404: Team not found.</div>
      );
    }

    return (
      <div className="home-page">
        <WorkoutFeedContainer
          addWorkout={this.props.addWorkout}
          addResult={this.props.addResult}
          addTeamWorkout={this.props.addTeamWorkout}
          matchAthlete={this.props.matchAthlete}
          queryResults={this.props.queryResults}
          currentTeamWorkout={this.props.currentTeamWorkout}
          currentResults={this.props.currentResults}
          deleteResult={this.props.deleteResult}
          deleteWorkout={this.props.deleteWorkout}
          deleteTeamWorkout={this.props.deleteTeamWorkout}
          fetchDistResults={this.props.fetchDistResults}
          fetchTimeResults={this.props.fetchTimeResults}
          fetchUser={this.props.fetchUser}
          fetchUserWorkouts={this.props.fetchUserWorkouts}
          fetchTeamWorkouts={this.props.fetchTeamWorkouts}
          fetchTeamWorkout={this.props.fetchTeamWorkout}
          isCoach={this.props.isCoach}
          soloWorkouts={this.props.workouts}
          teamWorkouts={this.props.teamWorkouts}
          team={this.props.team}
          userId={this.props.match.params.userId}
          updateWorkout={this.props.updateWorkout}
          updateTeamWorkout={this.props.updateTeamWorkout}
        />
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    fetchUser, fetchUserWorkouts, fetchTeamSoloWorkouts,
    updateWorkout, fetchUserTeam, addWorkout, deleteWorkout,
    addTeamWorkout, fetchTeamWorkouts, fetchTeamWorkout, updateTeamWorkout,
    deleteTeamWorkout, addResult, fetchDistResults, fetchTimeResults, matchAthlete,
    deleteResult,
  },
)(HomePage));
