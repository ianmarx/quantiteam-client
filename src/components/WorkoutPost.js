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
          <div className="header p">
            <div className='header-item'>
              <NavLink className='profile-link bold' to={`/profile/${this.props.workout._creator}`}>
                {this.props.workout.creatorName}
              </NavLink>
            </div>
            <div className='cap-1 ctr header-item'>{this.props.workout.activity}</div>
            <div className='header-item right'>{dateString}</div>
          </div>
          <div className='content p-sm'>
            <div className='col-unit'>
              <div className='p-extra-sm'>Distance</div>
              <div className='row-unit'>
                <input
                  className={`distance input-md ${this.state.distanceIsValid ? '' : 'invalid'}`}
                  onChange={this.onDistanceChange}
                  value={this.state.distance}
                  type="text"
                />
                {this.props.workout.distUnit}
              </div>
            </div>
            <div className='col-unit'>
              <div className='p-extra-sm'>Time</div>
              <div className='row-unit'>
                <input
                  className={`time input-lg ${this.state.timeIsValid ? '' : 'invalid'}`}
                  onChange={this.onTimeStringChange}
                  value={this.state.timeString}
                  type="text"
                />
              </div>
            </div>
            {(this.props.workout.activity === 'row' || this.props.workout.activity === 'erg') &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Stroke Rate</div>
                <div className='row-unit'>
                  <input
                    className={`stroke-rate input-md ${this.state.strokeRateIsValid ? '' : 'invalid'}`}
                    onChange={this.onStrokeRateChange}
                    value={this.state.strokeRate}
                    type="text"
                  />
                  <div>s/m</div>
                </div>
              </div>
            }
            <div className='col-unit'>
              <div className='p-extra-sm'>Heart Rate</div>
              <div className='row-unit'>
                <input
                  className={`heart-rate input-md ${this.state.avgHRIsValid ? '' : 'invalid'}`}
                  onChange={this.onHeartRateChange}
                  value={this.state.avgHR}
                  type="text"
                />
                <div>bpm</div>
              </div>
            </div>
            {this.props.workout.activity === 'bike' &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Watts</div>
                <div className='row-unit'>
                  <input
                    className={`watts input-md ${this.state.wattsIsValid ? '' : 'invalid'}`}
                    onChange={this.onWattsChange}
                    value={this.state.watts}
                    type="text"
                  />
                  <div>watts</div>
                </div>
              </div>
            }
          </div>
          <div className='footer'>
            <div className='status-text error'>{this.state.statusMessage}</div>
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
          <div className="header p">
            <div className='header-item'>
              <NavLink className='profile-link bold' to={`/profile/${this.props.workout._creator}`}>
                {this.props.workout.creatorName}
              </NavLink>
            </div>
            <div className='cap-1 ctr header-item'>{this.props.workout.activity}</div>
            <div className='header-item right'>{dateString}</div>
          </div>
          <div className='content h3-light'>
            <div className='col-unit'>
              <div className='p-extra-sm'>Distance</div>
              <div>{this.props.workout.distance} {this.props.workout.distUnit}</div>
            </div>
            <div className='col-unit'>
              <div className='p-extra-sm'>Time</div>
              <div>{this.props.workout.timeString}</div>
            </div>
            {this.props.workout.splitString &&
              <div className='col-unit'>
                <div className='p-extra-sm'>s/500m</div>
                <div>{this.props.workout.splitString}</div>
              </div>
            }
            {this.props.workout.strokeRate &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Stroke Rate</div>
                <div>{this.props.workout.strokeRate} s/m</div>
              </div>
            }
            {this.props.workout.avgHR &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Heart Rate</div>
                <div>{this.props.workout.avgHR} bpm</div>
              </div>
            }
            {this.props.workout.watts &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Watts</div>
                <div>{this.props.workout.watts}</div>
              </div>
            }
          </div>
          <div className='footer'>
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
