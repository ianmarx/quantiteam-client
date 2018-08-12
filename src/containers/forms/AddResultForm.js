import React, { Component } from 'react';
import round from 'lodash.round';

class AddResultForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      distance: '',
      athleteName: '',
      hours: '',
      minutes: '',
      seconds: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      statusMessage: '',
    };

    this.onAthleteNameChange = this.onAthleteNameChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
  }

  componentDidMount() {
    if (this.props.teamWorkout.type === 'time') {
      /* split up the time value into separate units for editing mode */
      const h = Math.floor(this.props.teamWorkout.time / 3600);
      const remainder = this.props.teamWorkout.time % 3600;
      const m = Math.floor(remainder / 60);
      const s = round((remainder % 60), 1);
      this.setState({
        hours: h,
        minutes: m,
        seconds: s,
      });
    } else {
      this.setState({
        distance: this.props.teamWorkout.distance,
      });
    }

    this.setState({
      type: this.props.teamWorkout.type,
    });
  }

  /* Handle changes in the add result fields */
  onAthleteNameChange(event) {
    this.setState({ athleteName: event.target.value });
    if (this.state.athleteName !== '') {
      this.props.matchAthlete(this.state.athleteName, this.props.teamWorkout._team);
    }
  }

  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
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

  async onSubmit(event) {
    event.preventDefault();
    const activity = this.props.teamWorkout.activity;
    const distance = this.state.distance;
    const distUnit = this.props.teamWorkout.distUnit;
    const time = this.timeConvert();
    const strokeRate = this.state.strokeRate;
    const watts = this.state.watts;
    const avgHR = this.state.avgHR;
    const athleteName = this.state.athleteName;
    const resultObject = { athleteName, activity, distance, distUnit, time, strokeRate, watts, avgHR };
    await this.props.addResult(resultObject, this.props.teamWorkout._id);
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
    return (
      <div className="form-container">
        <form className="modal-form" onSubmit={this.onSubmit}>
          <div className="form-title">Add Result</div>
          <div className='form-row'>
            <input
              className='athlete-names'
              list="athletes"
              onChange={this.onAthleteNameChange}
              value={this.state.athleteName}
              type="text"
              placeholder='Athlete Name'
              required
            />
            <datalist id="athletes">
              {this.props.queryResults.map((athlete, i) => {
                return (
                  <option key={i} value={athlete.name} />
                );
              })}
            </datalist>
          </div>
          {this.state.type === 'time' &&
            <div className='form-row'>
              <input
                onChange={this.onDistanceChange}
                value={this.state.distance}
                type="text"
                placeholder='Distance'
                autoComplete='off'
                required
              />
              {this.props.teamWorkout.distUnit} {this.props.teamWorkout.activity}
            </div>
          }
          {this.state.type === 'distance' &&
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
              {this.props.teamWorkout.activity}
            </div>
          }
          {(this.props.teamWorkout.activity === 'erg' || this.props.teamWorkout.activity === 'row') &&
            <div className='form-row'>
              <input
                onChange={this.onStrokeRateChange}
                value={this.state.strokeRate}
                type="text"
                placeholder='s/m'
              />
            </div>
          }
          {(this.props.teamWorkout.activity === 'bike') &&
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

export default AddResultForm;
