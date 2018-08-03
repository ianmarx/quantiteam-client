import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import {
  fetchUser, updateUser, fetchUserWorkouts, updateWorkout, addWorkout,
  deleteWorkout, addTeam, fetchUserTeam, fetchUserDistTotals,
} from '../actions';
import SoloWorkoutFeedContainer from './SoloWorkoutFeedContainer';
import UserInfo from './UserInfo';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
    team: state.team.team,
    isCoach: state.team.isCoach,
    authenticated: state.auth.authenticated,
    userDistTotal: state.workouts.userDistTotal,
  }
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distTotals: [
        { x: 'Erg', distance: ((this.props.user.ergTotal / 1000) || 0), fill: '#eda412' },
        { x: 'Row', distance: ((this.props.user.rowTotal / 1000) || 0), fill: '#2b85bc' },
      ],
    };
  }

  async componentDidMount() {
    if (!this.props.authenticated) {
      this.props.history.replace('/signin');
    }

    this.props.fetchUser(this.props.match.params.userId);
    await this.props.fetchUserWorkouts(this.props.match.params.userId);
    await this.props.fetchUserTeam(this.props.match.params.userId);

    this.props.workouts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  render() {
    return (
      <div className="profile-page">
        <UserInfo user={this.props.user} team={this.props.team} updateUser={this.props.updateUser} />
        {/*
        {!this.props.isCoach &&
          <VictoryChart
            domainPadding={40}
            className='victory-container'
          >
            <VictoryLabel x={130}
              y={25}
              text="Workout Totals by Activity"
            />
            <VictoryAxis
              tickValues={['Erg', 'Row', 'Bike', 'Run']}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={x => (`${x}km`)}
            />
            <VictoryBar
              data={[
                { type: 'Erg', distance: ((this.props.user.ergTotal / 1000) || 0), fill: '#ffaf11' },
                { type: 'Row', distance: ((this.props.user.rowTotal / 1000) || 0), fill: '#2b85bc' },
                { type: 'Run', distance: ((this.props.user.runTotal / 1000) || 0), fill: '#5cb73e' },
                { type: 'Bike', distance: ((this.props.user.bikeTotal / 1000) || 0), fill: '#d65342' },
              ]}
              x="type"
              y="distance"
            />
          </VictoryChart>
        }
        */}
        <SoloWorkoutFeedContainer
          addWorkout={this.props.addWorkout}
          soloWorkouts={this.props.workouts}
          fetchUser={this.props.fetchUser}
          fetchUserWorkouts={this.props.fetchUserWorkouts}
          updateWorkout={this.props.updateWorkout}
          deleteWorkout={this.props.deleteWorkout}
          userId={this.props.match.params.userId}
          team={this.props.team}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchUser, updateUser, fetchUserWorkouts, addWorkout,
  updateWorkout, deleteWorkout, addTeam, fetchUserTeam, fetchUserDistTotals,
})(Profile));
