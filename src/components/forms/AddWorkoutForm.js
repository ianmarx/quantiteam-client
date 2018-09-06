import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeStringToSeconds from '../../utils/workout';

class AddWorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      distUnit: '',
      distance: '',
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

    this.onErgSelect = this.onErgSelect.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onRunSelect = this.onRunSelect.bind(this);
    this.onBikeSelect = this.onBikeSelect.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onTimeStringChange = this.onTimeStringChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  onErgSelect(event) {
    this.setState({ activity: 'erg', distUnit: 'm' });
  }

  onRowSelect(event) {
    this.setState({ activity: 'row', distUnit: 'm' });
  }

  onRunSelect(event) {
    this.setState({ activity: 'run', distUnit: 'mi' });
  }

  onBikeSelect(event) {
    this.setState({ activity: 'bike', distUnit: 'mi' });
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

  onPrevClick(event) {
    this.setState({
      activity: '',
      distance: '',
      timeString: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      distUnit: '',
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
      const activity = this.state.activity;
      const distance = this.state.distance;
      const distUnit = this.state.distUnit;
      const time = timeStringToSeconds(this.state.timeString);
      const strokeRate = this.state.strokeRate;
      const watts = this.state.watts;
      const avgHR = this.state.avgHR;
      const creatorName = this.props.userName;
      const creatorId = this.props.userId;
      const workoutObject = { activity, distance, distUnit, time, strokeRate, watts, avgHR, creatorName, creatorId };
      await this.props.addWorkout(workoutObject);
      if (this.props.workoutIsAdded) {
        this.props.onModalClose();
      }
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
    if (isNaN(this.state.distance)) {
      this.setState({ statusMessage: invalidMessage, distanceIsValid: false });
      isValid = false;
    }
    if (isNaN(timeStringToSeconds(this.state.timeString))) {
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
    if (this.state.activity === '') {
      return (
        <form className="modal-form" onSubmit={this.onSubmit}>
          <div className="form-title">New Workout</div>
          <div className='form-row activity'>
            <button id="erg-select" className="activity-select" onClick={this.onErgSelect}>Erg</button>
            <button id="row-select" className="activity-select" onClick={this.onRowSelect}>Row</button>
            <button id="run-select" className="activity-select" onClick={this.onRunSelect}>Run</button>
            <button id="bike-select" className="activity-select" onClick={this.onBikeSelect}>Bike</button>
          </div>
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
        </form>
      );
    }
    return (
      <form className="modal-form"
        autoComplete='off'
        onSubmit={this.onSubmit}
      >
        <div className="form-title">New Workout</div>
        <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
        <div className='form-row'>
          <input
            className={`distance ${this.state.distanceIsValid ? '' : 'invalid'}`}
            onChange={this.onDistanceChange}
            value={this.state.distance}
            type="text"
            placeholder='Distance'
            autoComplete='off'
            required
          />
          {this.state.distUnit} {this.state.activity}
        </div>
        <div className='form-row'>
          <input
            className={`time ${this.state.timeIsValid ? '' : 'invalid'}`}
            onChange={this.onTimeStringChange}
            value={this.state.timeString}
            type="text"
            placeholder='Time'
            autoComplete='off'
            required
          />
        </div>
        {(this.state.activity === 'erg' || this.state.activity === 'row') &&
          <div className='form-row'>
            <input
              className={`stroke-rate ${this.state.strokeRateIsValid ? '' : 'invalid'}`}
              onChange={this.onStrokeRateChange}
              value={this.state.strokeRate}
              type="text"
              placeholder='s/m'
            />
          </div>
        }
        {(this.state.activity === 'bike') &&
          <div className='form-row'>
            <input
              className={`watts ${this.state.wattsIsValid ? '' : 'invalid'}`}
              onChange={this.onWattsChange}
              value={this.state.watts}
              type="text"
              placeholder='Watts'
            />
          </div>
        }
        <div className='form-row'>
          <input
            className={`heart-rate ${this.state.avgHRIsValid ? '' : 'invalid'}`}
            onChange={this.onHeartRateChange}
            value={this.state.avgHR}
            type="text"
            placeholder='Heart Rate'
          />
          bpm
        </div>
        {this.state.statusMessage !== '' &&
          <div className='status-text error'>{this.state.statusMessage}</div>
        }
        {this.props.statusText &&
          <div className='status-text'>{this.props.statusText}</div>
        }
        <button type="submit" className="modal-submit">Submit</button>
        <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
      </form>
    );
  }
}

AddWorkoutForm.propTypes = {
  addWorkout: PropTypes.func,
  onModalClose: PropTypes.func,
  statusText: PropTypes.string,
  userId: PropTypes.string,
  userName: PropTypes.string,
  workoutIsAdded: PropTypes.bool,
};

export default AddWorkoutForm;