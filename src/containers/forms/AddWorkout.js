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
    this.setState({
      activity: 'erg',
      distUnit: 'm',
    });
  }
  onRowSelect(event) {
    this.setState({
      activity: 'row',
      distUnit: 'km',
    });
  }
  onRunSelect(event) {
    this.setState({ activity: 'run' });
  }
  onBikeSelect(event) {
    this.setState({ activity: 'bike' });
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
  onSubmit(event) {
    console.log('Workout add submitted');
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const strokeRate = this.state.strokeRate;
    const watts = this.state.watts;
    const avgHR = this.state.avgHR;
    const workoutObject = { activity, distance, distUnit, time, strokeRate, watts, avgHR };
    this.props.addWorkout(workoutObject, this.props.userId);
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
            <div className="form-title">Add Workout</div>
            <div className="form-column-group">
              <ul className="form-column">
                <li id="type-field">
                  <h3>Workout Type</h3>
                </li>
                <li>
                  <button id="erg-select" className="activity-select" onClick={this.onErgSelect}>Erg</button>
                  <button id="row-select" className="activity-select" onClick={this.onRowSelect}>Row</button>
                  <button id="run-select" className="activity-select" onClick={this.onRunSelect}>Run</button>
                  <button id="bike-select" className="activity-select" onClick={this.onBikeSelect}>Bike</button>
                </li>
                <li>
                  <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="form-container">
        <form className="modal-form" onSubmit={this.onSubmit}>
          <div className="form-title">Add Workout</div>
          <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
          <div className="column-group">
            <ul className="form-column">
              <li id="distance-field">
                <h3>Distance</h3>
                <input onChange={this.onDistanceChange} value={this.state.distance}
                  type="text" required
                />
              </li>
              <li id="time-field">
                <h3>Hours</h3>
                <input onChange={this.onHoursChange} value={this.state.hours}
                  type="text" required
                />
                <h3>Minutes</h3>
                <input onChange={this.onMinutesChange} value={this.state.minutes}
                  type="text" required
                />
                <h3>Seconds</h3>
                <input onChange={this.onSecondsChange} value={this.state.seconds}
                  type="text" required
                />
              </li>
              <li>
                <h3>Average HR (bpm)</h3>
                <input onChange={this.onHeartRateChange} value={this.state.avgHR}
                  type="text"
                />
              </li>
            </ul>
            <ul className="form-column">
              <li>
                <h3>Activity</h3>
                {this.state.activity === 'erg' &&
                  <div className="static-info">Ergometer</div>
                }
                {this.state.activity === 'row' &&
                  <div className="static-info">Rowing</div>
                }
                {this.state.activity === 'run' &&
                  <div className="static-info">Running</div>
                }
                {this.state.activity === 'bike' &&
                  <div className="static-info">Cycling</div>
                }
              </li>
              <li>
                <h3>Distance Units</h3>
                {this.state.activity === 'erg' &&
                  <div className="static-info">m</div>
                }
                {this.state.activity === 'row' &&
                  <div className="static-info">km</div>
                }
                {this.state.activity === 'run' &&
                  <select required value={this.state.distUnit} onChange={this.onDistUnitChange}>
                    <option default value="">Select</option>
                    <option value="km">km</option>
                    <option value="m">m</option>
                  </select>
                }
                {this.state.activity === 'bike' &&
                  <select required value={this.state.distUnit} onChange={this.onDistUnitChange}>
                    <option default value="">Select</option>
                    <option value="km">km</option>
                  </select>
                }
              </li>
              {(this.state.activity === 'erg' || this.state.activity === 'row') &&
                <li>
                  <h3>Stroke Rate</h3>
                  <input onChange={this.onStrokeRateChange} value={this.state.strokeRate}
                    type="text"
                  />
                </li>
              }
              {(this.state.activity === 'bike') &&
                <li>
                  <h3>Watts</h3>
                  <input onChange={this.onWattsChange} value={this.state.watts}
                    type="text"
                  />
                </li>
              }
              <div className="button-group">
                <button type="submit" className="modal-submit">Submit</button>
                <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
              </div>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default AddWorkoutForm;