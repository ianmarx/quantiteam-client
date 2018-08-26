import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import timeStringToSeconds from '../utils/workout';

class WorkoutPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      activity: '',
      distance: '',
      distUnit: '',
      timeString: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      showingDetails: false,
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
      strokeRateIsValid: true,
      wattsIsValid: true,
      avgHRIsValid: true,
    };

    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onTimeStringChange = this.onTimeStringChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onShowDetailsClick = this.onShowDetailsClick.bind(this);
    this.onHideDetailsClick = this.onHideDetailsClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.shouldShowDetailButton = this.shouldShowDetailButton.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      activity: this.props.workout.activity,
      distance: this.props.workout.distance,
      distUnit: this.props.workout.distUnit,
      timeString: this.props.workout.timeString,
      strokeRate: this.props.workout.strokeRate || '',
      watts: this.props.workout.watts || '',
      avgHR: this.props.workout.avgHR || '',
    });
  }

  onEditClick(event) {
    this.setState({ isEditing: true });
  }

  onDeleteClick(event) {
    this.props.deleteWorkout(this.props.workout._id, this.props.workout._creator);
  }

  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }

  onTimeStringChange(event) {
    this.setState({ timeString: event.target.value });
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
    this.setState({
      isEditing: false,
      distance: this.props.workout.distance,
      distUnit: this.props.workout.distUnit,
      timeString: this.props.workout.timeString,
      strokeRate: this.props.workout.strokeRate || '',
      watts: this.props.workout.watts || '',
      avgHR: this.props.workout.avgHR || '',
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
      strokeRateIsValid: true,
      wattsIsValid: true,
      avgHRIsValid: true,
    });
  }

  onShowDetailsClick(event) {
    this.setState({ showingDetails: true });
  }

  onHideDetailsClick(event) {
    this.setState({ showingDetails: false });
  }

  async onSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      const distance = this.state.distance;
      const distUnit = this.state.distUnit;
      const time = timeStringToSeconds(this.state.timeString);
      const strokeRate = this.state.strokeRate;
      const watts = this.state.watts;
      const avgHR = this.state.avgHR;
      const workoutObject = {
        distance, distUnit, time, strokeRate, watts, avgHR,
      };
      await this.props.updateWorkout(this.props.workout._id, workoutObject);
      this.setState({
        isEditing: false,
      });
    }
  }

  shouldShowDetailButton() {
    if (this.props.workout.avgHR || this.props.workout.strokeRate) {
      return true;
    } else {
      return false;
    }
  }

  validateInput() {
    this.setState({
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
      strokeRateIsValid: true,
      avgHRIsValid: true,
      wattsIsValid: true,
    });
    let isValid = true;
    const invalidMessage = 'One or more input parameters are invalid.';
    if (this.state.distance === '' || isNaN(this.state.distance)) {
      this.setState({ statusMessage: invalidMessage, distanceIsValid: false });
      isValid = false;
    }
    if (this.state.timeString === '' || isNaN(timeStringToSeconds(this.state.timeString))) {
      this.setState({ statusMessage: invalidMessage, timeIsValid: false });
      isValid = false;
    }
    if (this.state.strokeRate !== '' && isNaN(this.state.strokeRate)) {
      this.setState({ statusMessage: invalidMessage, strokeRateIsValid: false });
      isValid = false;
    }
    if (this.state.avgHR !== '' && isNaN(this.state.avgHR)) {
      this.setState({ statusMessage: invalidMessage, avgHRIsValid: false });
      isValid = false;
    }
    if (this.state.watts !== '' && isNaN(this.state.watts)) {
      this.setState({ statusMessage: invalidMessage, wattsIsValid: false });
      isValid = false;
    }
    return isValid;
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
          <div className="header">
            <NavLink className='workout-creator' to={`/profile/${this.props.workout._creator}`}>
              {this.props.workout.creatorName}
            </NavLink>
            <div>{dateString}</div>
          </div>
          <div className='content'>
            <div className='row-unit'>
              <input
                className={`distance input-md ${this.state.distanceIsValid ? '' : 'invalid'}`}
                onChange={this.onDistanceChange}
                value={this.state.distance}
                type="text"
              />
              <div>{this.props.workout.distUnit} {this.props.workout.activity}</div>
            </div>
            <div className='row-unit'>
              <input
                className={`time input-md ${this.state.timeIsValid ? '' : 'invalid'}`}
                onChange={this.onTimeStringChange}
                value={this.state.timeString}
                type="text"
              />
            </div>
          </div>
          <div className='details'>
            <div className='row-unit'>
              <input
                className={`heart-rate input-sm ${this.state.avgHRIsValid ? '' : 'invalid'}`}
                onChange={this.onHeartRateChange}
                value={this.state.avgHR}
                type="text"
              />
              <div>bpm</div>
            </div>
            {(this.props.workout.activity === 'erg' || this.props.workout.activity === 'row') &&
              <div className='row-unit'>
                <input
                  className={`stroke-rate input-sm ${this.state.strokeRateIsValid ? '' : 'invalid'}`}
                  onChange={this.onStrokeRateChange}
                  value={this.state.strokeRate}
                  type="text"
                />
                <div>s/m</div>
              </div>
            }
            {this.props.workout.activity === 'bike' &&
              <div className='row-unit'>
                <input
                  className={`watts input-sm ${this.state.wattsIsValid ? '' : 'invalid'}`}
                  onChange={this.onWattsChange}
                  value={this.state.watts}
                  type="text"
                />
                <div>watts</div>
              </div>
            }
          </div>
          <div className='footer'>
            {this.state.statusMessage !== '' &&
              <div className='status-text error'>{this.state.statusMessage}</div>
            }
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
          <div className="header">
            <NavLink className='workout-creator' to={`/profile/${this.props.workout._creator}`}>
              {this.props.workout.creatorName}
            </NavLink>
            <div>{dateString}</div>
          </div>
          <div className='content'>
            <div className='row-unit'>
              <div className='distance'>{this.props.workout.distance} {this.props.workout.distUnit} {this.props.workout.activity}</div>
              <div className='time-string'>{this.props.workout.timeString}</div>
              {this.props.workout.splitString &&
                <div className='split-string'>{this.props.workout.splitString} s/500m</div>
              }
            </div>
          </div>
          {this.state.showingDetails &&
            <div className='details'>
              {this.props.workout.strokeRate &&
                <div className='stroke-rate'>{this.props.workout.strokeRate} s/m</div>
              }
              {this.props.workout.avgHR &&
                <div className='heart-rate'>{this.props.workout.avgHR} bpm</div>
              }
              {this.props.workout.watts &&
                <div className='watts'>{this.props.workout.watts} watts</div>
              }
            </div>
          }
          <div className='footer'>
            {this.shouldShowDetailButton() &&
              <div>
                {this.state.showingDetails ? (
                  <i className="hide-details fas fa-angle-double-up" onClick={this.onHideDetailsClick} />
                ) : (
                  <i className="show-details fas fa-angle-double-down" onClick={this.onShowDetailsClick} />
                )}
              </div>
            }
            {this.props.workout._creator === this.props.currentUserId &&
              <div className='icon row-unit'>
                <i onClick={this.onEditClick} className="fas fa-edit" />
                <i onClick={this.onDeleteClick} className="fas fa-trash" />
              </div>
            }

          </div>
        </div>
      );
    }
  }
}

WorkoutPost.propTypes = {
  currentUserId: PropTypes.string,
  deleteWorkout: PropTypes.func,
  updateWorkout: PropTypes.func,
  workout: PropTypes.object,
};

export default WorkoutPost;
