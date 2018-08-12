import React, { Component } from 'react';

class AddWorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      distUnit: '',
      distance: '',
      hours: '',
      minutes: '',
      seconds: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      statusMessage: '',
    };

    this.onErgSelect = this.onErgSelect.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onRunSelect = this.onRunSelect.bind(this);
    this.onBikeSelect = this.onBikeSelect.bind(this);
    this.onActivityChange = this.onActivityChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onDistUnitChange = this.onDistUnitChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
  }

  /* Handle changes in the add workout fields */
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

  onPrevClick(event) {
    this.setState({ activity: '' });
  }

  /* Add a workout using the form */
  async onSubmit(event) {
    event.preventDefault();
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const strokeRate = this.state.strokeRate;
    const watts = this.state.watts;
    const avgHR = this.state.avgHR;
    const creatorName = this.props.userName;
    const creatorId = this.props.userId;
    const workoutObject = { activity, distance, distUnit, time, strokeRate, watts, avgHR, creatorName, creatorId };
    await this.props.addWorkout(workoutObject);
    this.setState({
      statusMessage: 'Success!',
    });
    setTimeout(() => {
      this.props.onModalClose();
    }, 1500);
  }

  /* convert the strings of each time values into the total number of seconds */
  timeConvert() {
    return ((parseFloat(this.state.hours, 10) * 3600) +
            (parseFloat(this.state.minutes, 10) * 60) +
            (parseFloat(this.state.seconds, 10).toPrecision(3) * 1));
  }

  render() {
    if (this.state.activity === '') {
      return (
        <div className="form-container">
          <form className="modal-form" onSubmit={this.onSubmit}>
            <div className="form-title">New Workout</div>
            <div className='form-row'>
              <button id="erg-select" className="activity-select" onClick={this.onErgSelect}>Erg</button>
              <button id="row-select" className="activity-select" onClick={this.onRowSelect}>Row</button>
              <button id="run-select" className="activity-select" onClick={this.onRunSelect}>Run</button>
              <button id="bike-select" className="activity-select" onClick={this.onBikeSelect}>Bike</button>
            </div>
            <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
          </form>
        </div>
      );
    }
    return (
      <div className="form-container">
        <form className="modal-form"
          autoComplete='off'
          onSubmit={this.onSubmit}
        >
          <div className="form-title">New Workout</div>
          <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
          <div className='form-row'>
            <input
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
              className='time-input'
              onChange={this.onHoursChange}
              value={this.state.hours}
              type="text"
              placeholder='H'
              autoComplete='off'
              required
            />
            <input
              className='time-input'
              onChange={this.onMinutesChange}
              value={this.state.minutes}
              type="text"
              placeholder='M'
              autoComplete='off'
              required
            />
            <input
              className='time-input'
              onChange={this.onSecondsChange}
              value={this.state.seconds}
              type="text"
              placeholder='S'
              autoComplete='off'
              required
            />
          </div>
          {(this.state.activity === 'erg' || this.state.activity === 'row') &&
            <div className='form-row'>
              <input
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
                onChange={this.onWattsChange}
                value={this.state.watts}
                type="text"
                placeholder='Watts'
              />
            </div>
          }
          <div className='form-row'>
            <input
              onChange={this.onHeartRateChange}
              value={this.state.avgHR}
              type="text"
              placeholder='Heart Rate'
            />
            bpm
          </div>
          <div>{this.state.statusMessage}</div>
          <button type="submit" className="modal-submit">Submit</button>
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
        </form>
      </div>
    );
  }
}

export default AddWorkoutForm;
