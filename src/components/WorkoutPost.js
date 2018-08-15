import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import round from 'lodash.round';

class WorkoutPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      activity: '',
      distance: '',
      distUnit: '',
      hours: '',
      minutes: '',
      seconds: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      showingDetails: false,
    };

    this.onActivityChange = this.onActivityChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onDistUnitChange = this.onDistUnitChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onLocalDeleteClick = this.onLocalDeleteClick.bind(this);
    this.onLocalEditClick = this.onLocalEditClick.bind(this);
    this.onShowDetailsClick = this.onShowDetailsClick.bind(this);
    this.onHideDetailsClick = this.onHideDetailsClick.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    /* split up the time value into separate units for editing mode */
    const h = Math.floor(this.props.workout.time / 3600);
    const remainder = this.props.workout.time % 3600;
    const m = Math.floor(remainder / 60);
    const s = round((remainder % 60), 1);

    /* set local editing state with data from this.props.workout */
    this.setState({
      activity: this.props.workout.activity,
      distance: this.props.workout.distance,
      distUnit: this.props.workout.distUnit,
      hours: h,
      minutes: m,
      seconds: s,
      strokeRate: this.props.workout.strokeRate || '',
      watts: this.props.workout.watts || '',
      avgHR: this.props.workout.avgHR || '',
    });
  }

  onLocalEditClick(event) {
    this.setState({ isEditing: true });
  }

  onLocalDeleteClick(event) {
    this.props.onDeleteClick(this.props.workout._id, this.props.workout._creator);
  }

  /* Handle changes in the add workout fields */
  onActivityChange(event) {
    this.setState({ activity: event.target.value });
  }

  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }

  onDistUnitChange(event) {
    this.setState({ distUnit: event.target.value });
  }

  onHoursChange(event) {
    this.setState({ hours: event.target.value });
  }

  onMinutesChange(event) {
    this.setState({ minutes: event.target.value });
  }

  onSecondsChange(event) {
    this.setState({ seconds: event.target.value });
  }

  onStrokeRateChange(event) {
    this.setState({ strokeRate: event.target.value });
  }

  onWattsChange(event) {
    this.setState({ watts: event.target.value });
  }

  onHeartRateChange(event) {
    this.setState({ avgHR: event.target.value });
  }

  onCancelClick(event) {
    this.setState({ isEditing: false });
  }

  onShowDetailsClick(event) {
    this.setState({ showingDetails: true });
  }

  onHideDetailsClick(event) {
    this.setState({ showingDetails: false });
  }

  async onSubmit(event) {
    event.preventDefault();
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const strokeRate = this.state.strokeRate;
    const watts = this.state.watts;
    let avgHR = this.state.avgHR;
    if (avgHR === '') {
      avgHR = 0;
    }
    const workoutObject = {
      activity, distance, distUnit, time, strokeRate, watts, avgHR,
    };
    await this.props.updateWorkout(this.props.workout._id, workoutObject);
    this.setState({
      isEditing: false,
    });
  }

  /* convert the strings of each time values into the total number of seconds */
  timeConvert() {
    return ((parseFloat(this.state.hours, 10) * 3600) +
            (parseFloat(this.state.minutes, 10) * 60) +
            (parseFloat(this.state.seconds, 10).toPrecision(3) * 1));
  }

  render() {
    const date = this.props.workout.date;
    const dateObject = new Date(date);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear().toString().substr(-2);
    const dateString = `${month}/${day}/${year}`;

    if (this.state.isEditing) {
      return (
        <form className="workout-post edit" onSubmit={this.onSubmit}>
          <div className="workout-post-header">
            <NavLink className='workout-creator' to={`/profile/${this.props.workout._creator}`}>
              {this.props.workout.creatorName}
            </NavLink>
            <div>{dateString}</div>
          </div>
          <div className='workout-post-content'>
            <div className='row-unit'>
              <input className='input-md' onChange={this.onDistanceChange} value={this.state.distance} type="text" />
              <div>{this.props.workout.distUnit} {this.props.workout.activity}</div>
            </div>
            <div className='row-unit'>
              <div>H</div>
              <input className='input-sm' onChange={this.onHoursChange} value={this.state.hours} type="text" />
              <div>M</div>
              <input className='input-sm' onChange={this.onMinutesChange} value={this.state.minutes} type="text" />
              <div>S</div>
              <input className='input-sm' onChange={this.onSecondsChange} value={this.state.seconds} type="text" />
            </div>
          </div>
          <div className='workout-post-details'>
            <div className='row-unit'>
              <input className='input-sm' onChange={this.onHeartRateChange}
                value={this.state.avgHR}
                type="text"
              />
              <div>bpm</div>
            </div>
            <div className='row-unit'>
              <input className='input-sm' onChange={this.onStrokeRateChange}
                value={this.state.strokeRate}
                type="text"
              />
              <div>s/m</div>
            </div>
          </div>
          <div className='workout-post-footer'>
            <div className='row-unit'>
              <button type="button" className="workout-edit-cancel" onClick={this.onCancelClick}><i className="fas fa-times" /></button>
              <button type="submit" className="workout-edit-submit"><i className="fas fa-check" /></button>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <div className={`workout-post ${this.state.showingDetails && 'show-details'}`}>
          <div className="workout-post-header">
            <NavLink className='workout-creator' to={`/profile/${this.props.workout._creator}`}>
              {this.props.workout.creatorName}
            </NavLink>
            <div>{dateString}</div>
          </div>
          <div className='workout-post-content'>
            <div className='row-unit'>
              <div>{this.props.workout.distance} {this.props.workout.distUnit} {this.props.workout.activity}</div>
              <div>{this.props.workout.timeString}</div>
              {this.props.workout.splitString &&
                <div>{this.props.workout.splitString} s/500m</div>
              }
            </div>
          </div>
          {this.state.showingDetails &&
            <div className='workout-post-details'>
              {(this.props.workout.strokeRate || this.props.workout.avgHR) ? (
                <div className='row-unit'>
                  {this.props.workout.strokeRate &&
                    <div>{this.props.workout.strokeRate} s/m</div>
                  }
                  {this.props.workout.avgHR &&
                    <div>{this.props.workout.avgHR} bpm</div>
                  }
                </div>
              ) : (
                <div>No workout details have been added.</div>
              )}
            </div>
          }
          <div className='workout-post-footer'>
            {this.state.showingDetails ? (
              <i className="fas fa-angle-double-up" onClick={this.onHideDetailsClick} />
            ) : (
              <i className="fas fa-angle-double-down" onClick={this.onShowDetailsClick} />
            )}
            {this.props.workout._creator === this.props.currentUserId &&
              <div className='icon row-unit'>
                <i onClick={this.onLocalEditClick} className="fas fa-edit" />
                <i onClick={this.onLocalDeleteClick} className="fas fa-trash" />
              </div>
            }

          </div>
        </div>
      );
    }
  }
}

export default WorkoutPost;
