import React, { Component } from 'react';

class AddTeamWorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      activity: 'erg',
      distUnit: 'm',
      distance: '',
      hours: '',
      minutes: '',
      seconds: '',
    };
    this.onActivityChange = this.onActivityChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onDistUnitChange = this.onDistUnitChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDistSelect = this.onDistSelect.bind(this);
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
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
  onTypeChange(event) {
    this.setState({ type: event.target.value });
  }
  onDistSelect(event) {
    this.setState({ type: 'distance' });
  }
  onTimeSelect(event) {
    this.setState({ type: 'time' });
  }
  onPrevClick(event) {
    this.setState({ type: '' });
  }
  /* Add a workout using the form */
  onSubmit(event) {
    console.log('Team Workout add submitted');
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const teamId = this.props.teamId;
    const type = this.state.type;
    const workoutObject = { activity, distance, distUnit, time, teamId, type };
    this.props.addTeamWorkout(workoutObject, this.props.userId);
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
          <div className="form-title">Add Team Workout</div>
          {this.state.type === '' &&
            <div className="form-column-group">
              <ul className="form-column">
                <li id="type-field">
                  <h3>Workout Type</h3>
                </li>
                <li>
                  <button className="type-select" onClick={this.onDistSelect}>Distance</button>
                  <button className="type-select" onClick={this.onTimeSelect}>Time</button>
                </li>
                <li>
                  <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
                </li>
              </ul>
            </div>
          }
          {this.state.type === 'distance' &&
            <div className="column-group">
              <ul className="form-column">
                <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
                <li id="distance-field">
                  <h3>Distance</h3>
                  <input onChange={this.onDistanceChange} value={this.state.distance}
                    type="text" required
                  />
                </li>
                <li>
                  <h3>Activity</h3>
                  <select required value={this.state.activity} onChange={this.onActivityChange}>
                    <option default value="erg">Erg</option>
                    <option value="row">Row</option>
                    <option value="run">Run</option>
                    <option value="bike">Bike</option>
                  </select>
                </li>
                <li>
                  <h3>Distance Units</h3>
                  <select required value={this.state.distUnit} onChange={this.onDistUnitChange}>
                    <option default value="m">m</option>
                    <option value="km">km</option>
                  </select>
                </li>
                <div className="button-group">
                  <button type="submit" className="modal-submit">Submit</button>
                  <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
                </div>
              </ul>
            </div>
          }
          {this.state.type === 'time' &&
            <div className="column-group">
              <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
              <ul className="form-column">
                <li id="time-field">
                  <h3>Hours</h3>
                  <input onChange={this.onHoursChange} value={this.state.hours}
                    type="text"
                  />
                  <h3>Minutes</h3>
                  <input onChange={this.onMinutesChange} value={this.state.minutes}
                    type="text"
                  />
                  <h3>Seconds</h3>
                  <input onChange={this.onSecondsChange} value={this.state.seconds}
                    type="text"
                  />
                </li>
              </ul>
              <ul className="form-column">
                <li>
                  <h3>Activity</h3>
                  <select required value={this.state.activity} onChange={this.onActivityChange}>
                    <option default value="erg">Erg</option>
                    <option value="row">Row</option>
                    <option value="run">Run</option>
                    <option value="bike">Bike</option>
                  </select>
                </li>
                <li>
                  <h3>Distance Units</h3>
                  <select required value={this.state.distUnit} onChange={this.onDistUnitChange}>
                    <option default value="m">m</option>
                    <option value="km">km</option>
                  </select>
                </li>
                <div className="button-group">
                  <button type="submit" className="modal-submit">Submit</button>
                  <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
                </div>
              </ul>
            </div>
          }
        </form>
      </div>
    );
  }
}

export default AddTeamWorkoutForm;
