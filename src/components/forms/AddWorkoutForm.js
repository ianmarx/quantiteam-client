import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeStringToSeconds from '../../utils/workout';
import * as DateUtils from '../../utils/date';

class AddWorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      date: '',
      distUnit: '',
      distance: '',
      timeString: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      statusMessage: '',
      dateIsValid: true,
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
    this.onDateChange = this.onDateChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onTimeStringChange = this.onTimeStringChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    const dateString = DateUtils.formatDateString(Date.now());
    this.setState({ date: dateString });
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

  onDateChange(event) {
    this.setState({ date: event.target.value });
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
      date: DateUtils.formatDateString(Date.now()),
      distance: '',
      timeString: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      distUnit: '',
      statusMessage: '',
      dateIsValid: true,
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
      const date = new Date(this.state.date);
      const workoutObject = { activity, distance, distUnit, time, strokeRate, watts, avgHR, creatorName, creatorId, date };
      await this.props.addWorkout(workoutObject);
      if (this.props.workoutIsAdded) {
        this.props.onModalClose();
      }
    }
  }

  validateInput() {
    this.setState({
      statusMessage: '',
      dateIsValid: true,
      distanceIsValid: true,
      timeIsValid: true,
      strokeRateIsValid: true,
      avgHRIsValid: true,
      wattsIsValid: true,
    });
    let isValid = true;
    const invalidMessage = 'One or more input parameters are invalid.';
    if (!DateUtils.checkDateFormat(this.state.date)) {
      this.setState({ statusMessage: invalidMessage, dateIsValid: false });
      isValid = false;
    }
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
        <div className="modal-form activity">
          <div className="h1">Add Workout</div>
          <button className="btn-select erg" onClick={this.onErgSelect}>Erg</button>
          <button className="btn-select row" onClick={this.onRowSelect}>Row</button>
          <button className="btn-select run" onClick={this.onRunSelect}>Run</button>
          <button className="btn-select bike" onClick={this.onBikeSelect}>Bike</button>
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
        </div>
      );
    } else {
      return (
        <form className="modal-form"
          autoComplete='off'
          onSubmit={this.onSubmit}
        >
          <div className='h1 cap-1'>New {this.state.activity}</div>
          <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
          <div className='col-unit p'>
            <div className='p-sm bold'>Date *</div>
            <input
              className={`${this.state.dateIsValid ? '' : 'invalid'}`}
              onChange={this.onDateChange}
              value={this.state.date}
              type='text'
            />
          </div>
          <div className='row-unit'>
            <div className='col-unit p'>
              <div className='p-sm bold'>Distance ({this.state.distUnit}) *</div>
              <input
                className={`distance ${this.state.distanceIsValid ? '' : 'invalid'}`}
                onChange={this.onDistanceChange}
                value={this.state.distance}
                type="text"
                autoComplete='off'
                required
              />
            </div>
            <div className='col-unit p'>
              <div className='p-sm bold'>Time *</div>
              <input
                className={`time ${this.state.timeIsValid ? '' : 'invalid'}`}
                onChange={this.onTimeStringChange}
                value={this.state.timeString}
                type="text"
                placeholder='hh:mm:ss.s'
                autoComplete='off'
                required
              />
            </div>
          </div>
          <div className='row-unit'>
            <div className='col-unit'>
              <div className='p-sm bold'>Heart Rate (bpm)</div>
              <input
                className={`heart-rate ${this.state.avgHRIsValid ? '' : 'invalid'}`}
                onChange={this.onHeartRateChange}
                value={this.state.avgHR}
                type="text"
              />
            </div>
            {(this.state.activity === 'erg' || this.state.activity === 'row') &&
              <div className='col-unit p'>
                <div className='p-sm bold'>Stroke Rate (s/m)</div>
                <input
                  className={`stroke-rate ${this.state.strokeRateIsValid ? '' : 'invalid'}`}
                  onChange={this.onStrokeRateChange}
                  value={this.state.strokeRate}
                  type="text"
                />
              </div>
            }
            {this.state.activity === 'bike' &&
              <div className='col-unit p'>
                <div className='p-sm bold'>Watts</div>
                <input
                  className={`watts ${this.state.wattsIsValid ? '' : 'invalid'}`}
                  onChange={this.onWattsChange}
                  value={this.state.watts}
                  type="text"
                />
              </div>
            }
          </div>
          <div className={`status-text ${this.state.statusMessage !== '' && 'error'}`}>
            {this.state.statusMessage !== '' ? this.state.statusMessage : this.props.statusText}
          </div>
          <button type="submit" className="modal-submit">Submit</button>
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
          <div id='required-msg' className='p-extra-sm'>* indicates a required field.</div>
        </form>
      );
    }
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
