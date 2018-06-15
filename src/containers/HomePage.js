import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import {
  fetchUser, fetchUserWorkouts, fetchTeamSoloWorkouts,
  updateWorkout, fetchUserTeam, addWorkout, deleteWorkout,
  addTeamWorkout, fetchTeamWorkouts, fetchTeamWorkout, updateTeamWorkout, deleteTeamWorkout,
  addResult, fetchDistResults, fetchTimeResults, matchAthlete, deleteResult,
} from '../actions';
import WorkoutPost from './WorkoutPost';
import TeamWorkoutPost from './TeamWorkoutPost';
import AddWorkoutForm from './forms/AddWorkout';
import AddTeamWorkoutForm from './forms/AddTeamWorkout';
import AddResultForm from './forms/AddResult';
import ResultsView from '../components/ResultsView';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
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
  constructor(props) {
    super(props);
    this.state = {
      showTeamWorkoutModal: false,
      showAddWorkoutResultModal: false,
      showViewResultModal: false,
    };

    this.onAddWorkoutModalOpen = this.onAddWorkoutModalOpen.bind(this);
    this.onAddWorkoutModalClose = this.onAddWorkoutModalClose.bind(this);
    this.onWorkoutDeleteClick = this.onWorkoutDeleteClick.bind(this);
    this.onTeamWorkoutModalOpen = this.onTeamWorkoutModalOpen.bind(this);
    this.onTeamWorkoutModalClose = this.onTeamWorkoutModalClose.bind(this);
    this.onTeamWorkoutDeleteClick = this.onTeamWorkoutDeleteClick.bind(this);
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onViewResultModalOpen = this.onViewResultModalOpen.bind(this);
    this.onViewResultModalClose = this.onViewResultModalClose.bind(this);
    this.onResultAddClick = this.onResultAddClick.bind(this);
    this.onResultDeleteClick = this.onResultDeleteClick.bind(this);
    this.onViewResultsClick = this.onViewResultsClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
    this.props.fetchTeamWorkouts(this.props.match.params.userId);
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

  async onResultAddClick(teamWorkoutId, prevProps) {
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

    this.onViewResultModalOpen();
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

  onViewResultModalOpen(event) {
    this.setState({ showViewResultModal: true });
  }

  onViewResultModalClose(event) {
    this.setState({ showViewResultModal: false });
  }

  sortWorkoutsByDate() {
    const combinedList = this.props.workouts.concat(this.props.teamWorkouts);
    const sortedList = combinedList.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return sortedList;
  }


  render() {
    if (!this.props.user.team) {
      return (
        <div>Error 404: Team not found.</div>
      );
    }

    return (
      <div className="home-page">
        <div className="workout-feed">
          <div className="feed-title">{this.props.team.name}</div>
          {this.props.isCoach ? (
            <button id="team-workout-modal-button" onClick={this.onTeamWorkoutModalOpen}>Add Team Workout</button>
          ) : (
            <button id="modal-button" onClick={this.onAddWorkoutModalOpen}>Add Workout</button>
          )
          }
          {this.sortWorkoutsByDate().map((workout) => {
            // decide which component to return based on workout type
            if (workout.creatorName) {
              return (
                <WorkoutPost userId={workout._creator}
                  workout={workout}
                  key={workout.date}
                  onDeleteClick={this.onWorkoutDeleteClick}
                  updateWorkout={this.props.updateWorkout}
                  currentUserId={this.props.match.params.userId}
                />
              );
            } else {
              return (
                <TeamWorkoutPost userId={workout._creator}
                  teamWorkout={workout}
                  key={workout.date}
                  isCoach={this.props.isCoach}
                  onDeleteClick={this.onTeamWorkoutDeleteClick}
                  updateTeamWorkout={this.props.updateTeamWorkout}
                  onResultAddClick={this.onResultAddClick}
                  onViewResultsClick={this.onViewResultsClick}
                />
              );
            }
          })}
        </div>
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
            onModalClose={this.onAddWorkoutModalClose}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.showViewResultModal}
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          <div className='results-modal-container'>
            <ResultsView
              results={this.props.currentResults}
              teamWorkout={this.props.currentTeamWorkout}
              onDeleteClick={this.onResultDeleteClick}
              fetchDistResults={this.props.fetchDistResults}
              fetchTimeResults={this.props.fetchTimeResults}
              updateWorkout={this.props.updateWorkout}
              onModalClose={this.onViewResultModalClose}
            />
          </div>
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
            onModalClose={this.onTeamWorkoutModalClose}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.showAddResultModal}
          contentLabel="Add Result"
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          {this.props.currentTeamWorkout !== undefined &&
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
