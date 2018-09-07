import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import {
  updateWorkout,
} from '../actions/workout';
import { fetchUser } from '../actions/user';
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
import AddResultForm from '../components/forms/AddResultForm';
import AddTeamWorkoutForm from '../components/forms/AddTeamWorkoutForm';
import LoadingPage from '../components/mini/LoadingScreen';
import PageFooter from '../components/mini/PageFooter';

export const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    userIsFetched: state.auth.userIsFetched,
    team: state.team.team,
    isFetchingTeam: state.team.isFetchingTeam,
    teamIsFetched: state.team.teamIsFetched,
    isCoach: state.team.isCoach,
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

export class TeamProfile extends Component {
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
    this.onAddResultModalOpen = this.onAddResultModalOpen.bind(this);
    this.onAddResultModalClose = this.onAddResultModalClose.bind(this);
    this.onViewResultsModalOpen = this.onViewResultsModalOpen.bind(this);
    this.onViewResultsModalClose = this.onViewResultsModalClose.bind(this);
    this.onTeamRosterModalOpen = this.onTeamRosterModalOpen.bind(this);
    this.onTeamRosterModalClose = this.onTeamRosterModalClose.bind(this);
    this.onAddResultClick = this.onAddResultClick.bind(this);
    this.onViewResultsClick = this.onViewResultsClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/signin');
    }
    if (!this.props.userIsFetched) {
      this.props.fetchUser(this.props.userId);
    }
    if (!this.props.teamIsFetched) {
      this.props.fetchUserTeam(this.props.userId);
    }
    if (!this.props.teamWorkoutsFetched) {
      this.props.fetchTeamWorkouts(this.props.userId);
    }
  }

  async onViewResultsClick(teamWorkoutId, type) {
    await this.props.fetchTeamWorkout(teamWorkoutId);

    if (type === 'distance') {
      await this.props.fetchTimeResults(teamWorkoutId);
    }
    if (type === 'time') {
      await this.props.fetchDistResults(teamWorkoutId);
    }
    this.onViewResultsModalOpen();
  }

  async onAddResultClick(teamWorkoutId) {
    await this.props.fetchTeamWorkout(teamWorkoutId);
    this.onAddResultModalOpen();
  }

  onAddTeamWorkoutModalOpen(event) {
    this.setState({ showAddTeamWorkoutModal: true });
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  onAddTeamWorkoutModalClose(event) {
    this.setState({ showAddTeamWorkoutModal: false });
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  onAddResultModalOpen(event) {
    this.setState({ showAddResultModal: true });
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  onAddResultModalClose(event) {
    this.setState({ showAddResultModal: false });
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  onViewResultsModalOpen(event) {
    this.setState({ showViewResultsModal: true });
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  onViewResultsModalClose(event) {
    this.setState({ showViewResultsModal: false });
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  onTeamRosterModalOpen(event) {
    this.setState({ showTeamRosterModal: true });
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  onTeamRosterModalClose(event) {
    this.setState({ showTeamRosterModal: false });
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  render() {
    if (!this.props.teamIsFetched || !this.props.teamWorkoutsFetched) {
      return (
        <LoadingPage />
      );
    } else {
      return (
        <div className='team-page-container'>
          <TeamInfo
            team={this.props.team}
            isCoach={this.props.isCoach}
            onViewRosterClick={this.onTeamRosterModalOpen}
          />
          <TeamWorkoutFeed
            isFetchingTeamWorkouts={this.props.isFetchingTeamWorkouts}
            isCoach={this.props.isCoach}
            onAddTeamWorkoutModalOpen={this.onAddTeamWorkoutModalOpen}
            onAddResultClick={this.onAddResultClick}
            onViewResultsClick={this.onViewResultsClick}
            deleteTeamWorkout={this.props.deleteTeamWorkout}
            teamWorkouts={this.props.teamWorkouts}
            updateTeamWorkout={this.props.updateTeamWorkout}
          />
          <ReactModal
            isOpen={this.state.showViewResultsModal}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
            onRequestClose={this.onViewResultsModalClose}
          >
            {!this.props.isFetchingResults &&
              <ResultsView
                isCoach={this.props.isCoach}
                results={this.props.currentResults}
                teamWorkout={this.props.currentTeamWorkout}
                deleteResult={this.props.deleteResult}
                updateResult={this.props.updateResult}
                onModalClose={this.onViewResultsModalClose}
              />
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
            onRequestClose={this.onTeamRosterModalClose}
          >
            <TeamRoster
              coaches={this.props.team.coaches}
              athletes={this.props.team.athletes}
              onCloseRosterClick={this.onTeamRosterModalClose}
            />
          </ReactModal>
          <PageFooter />
        </div>
      );
    }
  }
}

TeamProfile.propTypes = {
  userId: PropTypes.string,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  team: PropTypes.object,
  isFetchingTeam: PropTypes.bool,
  teamIsFetched: PropTypes.bool,
  isCoach: PropTypes.bool,
  teamWorkouts: PropTypes.array,
  isFetchingTeamWorkouts: PropTypes.bool,
  teamWorkoutsFetched: PropTypes.bool,
  currentTeamWorkout: PropTypes.object,
  currentResults: PropTypes.array,
  isFetchingTeamWorkout: PropTypes.bool,
  isFetchingResults: PropTypes.bool,
  queryResults: PropTypes.array,
};

export default withRouter(connect(mapStateToProps, {
  fetchUser, fetchUserTeam, fetchTeamWorkouts, addTeamWorkout,
  updateTeamWorkout, deleteTeamWorkout, addResult, matchAthlete, fetchDistResults, fetchTeamWorkout,
  fetchTimeResults, deleteResult, updateWorkout, updateResult,
})(TeamProfile));
