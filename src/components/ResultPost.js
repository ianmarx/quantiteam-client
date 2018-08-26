import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeStringToSeconds from '../utils/workout';

class ResultPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      distance: '',
      distUnit: '',
      timeString: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
      strokeRateIsValid: true,
      wattsIsValid: true,
      avgHRIsValid: true,
    };

    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onTimeStringChange = this.onTimeStringChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    this.setState({
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
    this.props.deleteResult(this.props.workout._id, this.props.teamWorkoutId);
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
      await this.props.updateResult(this.props.workout._id, workoutObject);
      this.setState({
        isEditing: false,
      });
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
    if (this.state.distance !== '' && isNaN(this.state.distance)) {
      this.setState({ statusMessage: invalidMessage, distanceIsValid: false });
      isValid = false;
    }
    if (this.state.timeString !== '' && isNaN(timeStringToSeconds(this.state.timeString))) {
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
    if (this.state.isEditing) {
      return (
        <form className="result-post edit" onSubmit={this.onSubmit}>
          <div className='content'>
            {this.props.type === 'time' &&
              <div className='row-unit'>
                <input
                  className={`distance input-md ${this.state.distanceIsValid ? '' : 'invalid'}`}
                  onChange={this.onDistanceChange}
                  value={this.state.distance}
                  type="text"
                />
                <div>{this.props.workout.distUnit}</div>
              </div>
            }
            {this.props.type === 'distance' &&
              <div className='row-unit'>
                <input
                  className={`time input-md ${this.state.timeIsValid ? '' : 'invalid'}`}
                  onChange={this.onTimeStringChange}
                  value={this.state.timeString}
                  type="text"
                />
              </div>
            }
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
                <div>s/m</div>
              </div>
            }
            <div className='row-unit'>
              <button type="button" className="workout-edit-cancel" onClick={this.onCancelClick}><i className="fas fa-times" /></button>
              <button type="submit" className="workout-edit-submit"><i className="fas fa-check" /></button>
            </div>
          </div>
          {this.state.statusMessage !== '' &&
            <div className='footer'>
              <div className='status-text error'>{this.state.statusMessage}</div>
            </div>
          }
        </form>
      );
    } else {
      return (
        <div className="result-post">
          <div className='content'>
            <div className='athlete-name'>
              <strong>{this.props.workout.creatorName}</strong>
            </div>
            {this.props.type === 'time' &&
              <div className='distance'>{this.props.workout.distance} {this.props.workout.distUnit}</div>
            }
            {this.props.type === 'distance' &&
              <div className='time-string'>{this.props.workout.timeString}</div>
            }
            {this.props.workout.splitString &&
              <div className='split-string'>{this.props.workout.splitString} s/500m</div>
            }
            {this.props.workout.strokeRate &&
              <div className='stroke-rate'>{this.props.workout.strokeRate} s/m</div>
            }
            {this.props.workout.avgHR &&
              <div className='heart-rate'>{this.props.workout.avgHR} bpm</div>
            }
            {this.props.workout.watts &&
              <div className='watts'>{this.props.workout.watts} watts</div>
            }
            {this.props.isCoach &&
              <div className='row-unit'>
                <div className="icon">
                  <i onClick={this.onEditClick} id='editWorkout' className="fas fa-edit" />
                </div>
                <div className="icon">
                  <i onClick={this.onDeleteClick} id='deleteWorkout' className="fas fa-trash" />
                </div>
              </div>
            }
          </div>
        </div>
      );
    }
  }
}

ResultPost.propTypes = {
  deleteResult: PropTypes.func,
  isCoach: PropTypes.bool,
  teamWorkoutId: PropTypes.string,
  type: PropTypes.string,
  updateResult: PropTypes.func,
  workout: PropTypes.object,
};

export default ResultPost;
