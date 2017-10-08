import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { fetchUser, updateUser, fetchUserWorkouts, updateWorkout,
  deleteWorkout, addTeam, fetchUserTeam, fetchUserDistTotals } from '../actions';
import WorkoutPost from './workout-post';
import UserInfo from './user-info';

const mapStateToProps = state => (
  {
    user: state.profile.user,
    workouts: state.workouts.list,
    team: state.team.team,
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
    this.displayFeed = this.displayFeed.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.displayWeekChart = this.displayWeekChart.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    if (!this.props.authenticated) {
      console.log('should redirect to signin');
      this.props.history.replace('/signin');
    }
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
    this.props.fetchUserTeam(this.props.match.params.userId);
  }
  onDeleteClick(workoutId, userId) {
    this.props.deleteWorkout(workoutId, userId);
    console.log('Workout deleted successfully'); // added b/c message in deleteWorkout action not showing up
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchUserWorkouts(this.props.match.params.userId);
  }
  displayFeed() {
    this.props.workouts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return (
      <div className="workout-feed">
        {this.props.workouts.map((workout, i) => {
          return (
            <div key={`workout-${i}`}>
              <WorkoutPost userId={workout._creator} workout={workout} index={i}
                onDeleteClick={this.onDeleteClick} updateWorkout={this.props.updateWorkout}
              />
            </div>
          );
        })}
      </div>
    );
  }
  displayInfo() {
    return (
      <UserInfo user={this.props.user} team={this.props.team} updateUser={this.props.updateUser} />
    );
  }
  displayWeekChart() {
    return (
      <VictoryChart
        domainPadding={40}
      >
        <VictoryLabel x={130} y={25}
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
            { type: 'Erg', distance: ((this.props.user.ergTotal / 1000) || 0), fill: '#eda412' },
            { type: 'Row', distance: ((this.props.user.rowTotal / 1000) || 0), fill: '#2b85bc' },
            { type: 'Run', distance: ((this.props.user.runTotal / 1000) || 0), fill: '#5cb73e' },
            { type: 'Bike', distance: ((this.props.user.bikeTotal / 1000) || 0), fill: '#d65342' },
          ]}
          x="type"
          y="distance"
        />
      </VictoryChart>
    );
  }
  render() {
    return (
      <div className="profile-page">
        <div className="profile-column">
          {this.displayInfo()}
          {this.displayWeekChart()}
        </div>
        <div className="profile-column">
          <div id="feed-title">My Workouts</div>
          {this.displayFeed()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, updateUser, fetchUserWorkouts,
  updateWorkout, deleteWorkout, addTeam, fetchUserTeam, fetchUserDistTotals })(Profile));
