import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUser, fetchUserTeam, fetchTeamWorkouts, updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, queryResults,
  fetchDistResults, fetchTeamWorkout, fetchTimeResults, deleteResult } from '../actions';
import AddTeamWorkoutForm from './forms/add-team-workout-form';
import AddResultForm from './forms/add-result-form';
import TeamWorkoutPost from './team-workout-post';
import ResultsView from '../components/ResultsView';
import TeamInfo from '../components/TeamInfo';

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
      showAddTeamWorkoutModal: false,
      showRoster: true,
    };
    this.displayTeamFeed = this.displayTeamFeed.bind(this);
    this.onViewResultsClickBound = this.onViewResultsClick.bind(this);
    this.onViewResultsModalOpenBound = this.onViewResultsModalOpen.bind(this);
    this.onViewResultsModalCloseBound = this.onViewResultsModalClose.bind(this);
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onResultAddClick = this.onResultAddClick.bind(this);
  }
  async componentDidMount() {
    if (!this.props.authenticated) {
      console.log('should redirect to signin');
      this.props.history.replace('/signin');
    }
    await this.props.fetchUser(this.props.match.params.userId);
    await this.props.fetchUserTeam(this.props.match.params.userId);
    await this.props.fetchTeamWorkouts(this.props.match.params.userId);
  }

  async onViewResultsClick(teamWorkoutId, type) {
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

  displayTeamFeed() {
    return (
      <div className="workout-posts">
        {this.props.teamWorkouts.map((workout, i) => {
          return (
            <div key={`workout-${i}`}>
              <TeamWorkoutPost userId={workout._creator} teamWorkout={workout} index={i}
                onDeleteClick={this.onTeamWorkoutDeleteClick}
                updateTeamWorkout={this.props.updateTeamWorkout}
                fetchTeamWorkout={this.props.fetchTeamWorkout}
                onResultAddClick={this.onResultAddClick}
                onViewResultsClick={this.onViewResultsClickBound}
              />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    console.log(this.props.currentTeamWorkout._id);
    return (
      <div className="team-page">
        <div className="team-column">
          <TeamInfo team={this.props.team} />
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
              type={this.props.currentTeamWorkout.type}
              deleteResult={this.props.deleteResult}
              fetchDistResults={this.props.fetchDistResults}
              fetchTimeResults={this.props.fetchTimeResults}
              updateWorkout={this.props.updateWorkout}
              onModalClose={this.onViewResultsModalCloseBound}
            />
          }
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, fetchUserTeam, fetchTeamWorkouts,
  updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, queryResults, fetchDistResults, fetchTeamWorkout,
  fetchTimeResults, deleteResult })(TeamProfile));
