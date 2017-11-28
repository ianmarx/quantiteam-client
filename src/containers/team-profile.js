import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser, fetchUserTeam, fetchTeamWorkouts, updateTeamWorkout, deleteTeamWorkout, addResult, fetchDistResults,
  fetchTimeResults, deleteResult } from '../actions';
import AddTeamWorkoutForm from './forms/add-team-workout-form';
import AddResultForm from './forms/add-result-form';
import TeamWorkoutPost from './team-workout-post';
import ResultsView from './results-view';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    team: state.team.team,
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
      showRoster: false,
    };
    this.displayTeamFeed = this.displayTeamFeed.bind(this);
    this.displayTeamLeaderboard = this.displayTeamLeaderboard.bind(this);
  }
  componentDidMount() {
    if (!this.props.authenticated) {
      console.log('should redirect to signin');
      this.props.history.replace('/signin');
    }
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
  }
  displayTeamFeed() {
    return (
      <div className="workout-posts">
        {this.props.teamWorkouts.map((workout, i) => {
          return (
            <div key={`workout-${i}`}>
              <TeamWorkoutPost userId={workout._creator} teamWorkout={workout} index={i}
                onDeleteClick={this.onTeamWorkoutDeleteClick}
                updateTeamWorkout={this.props.updateTeamWorkout}
                onResultAddClick={this.onResultAddClick}
                onViewResultsClick={this.onViewResultsClick}
              />
            </div>
          );
        })}
      </div>
    );
  }
  displayTeamLeaderboard() {
    if (this.state.showRoster) {
      return (
        <div className="team-leaderboard">
          <strong>Roster</strong>
          {this.props.team.athletes.map((athlete, i) => {
            return (
              <div key={`athlete-${i}`}>
                <NavLink to={`/profile/${athlete._id}`}>
                  <div className="profile-link">{athlete.name}</div>
                </NavLink>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          hello
        </div>
      );
    }
  }
  render() {
    return (
      <div className="team-page">
        <div className="team-column">
          <div className="team-info">
            <div id="teamName">
              {this.props.team.name}
            </div>
            <ul>
              <li>Location</li>
              <li>Coaches</li>
              <li>Roster</li>
            </ul>
          </div>
          <div className="seasons-info">
            <div id="seasonsTitle">Training Seasons</div>
          </div>
        </div>
        <div className="team-column">
          <div className="workout-feed">
            <div id="feed-title">Recent Workouts</div>
            {this.displayTeamFeed()}
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
          {this.props.currentResults !== undefined &&
            <ResultsView
              results={this.props.currentResults}
              teamWorkoutId={this.props.currentTeamWorkout._id}
              onDeleteClick={this.onResultDeleteClick}
              updateWorkout={this.props.updateWorkout}
              onModalClose={this.onViewResultModalClose}
            />
          }
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, fetchUserTeam, fetchTeamWorkouts,
  updateTeamWorkout, deleteTeamWorkout, addResult, fetchDistResults,
  fetchTimeResults, deleteResult })(TeamProfile));
