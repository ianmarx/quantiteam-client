import React, { Component } from 'react';

class AddTeamWorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      activity: '',
      distUnit: '',
      distance: '',
      hours: '',
      minutes: '',
      seconds: '',
      statusMessage: '',
    };

    this.onErgSelect = this.onErgSelect.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onRunSelect = this.onRunSelect.bind(this);
    this.onBikeSelect = this.onBikeSelect.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDistSelect = this.onDistSelect.bind(this);
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showActivitySelect = this.showActivitySelect.bind(this);
    this.showTypeSelect = this.showTypeSelect.bind(this);
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
    if (!this.showActivitySelect() && !this.showTypeSelect()) {
      this.setState({ type: '' });
    }
    if (this.showTypeSelect()) {
      this.setState({ activity: '' });
    }
  }

  /* Add a workout using the form */
  async onSubmit(event) {
    event.preventDefault();
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const teamId = this.props.teamId;
    const type = this.state.type;
    const workoutObject = { activity, distance, distUnit, time, teamId, type };
    await this.props.addTeamWorkout(workoutObject, this.props.userId);
    this.setState({
      statusMessage: 'Success!',
    });
    setTimeout(() => {
      this.props.onModalClose();
    }, 1500);
  }

  showActivitySelect() {
    return this.state.activity === '' && this.state.type === '';
  }

  showTypeSelect() {
    return this.state.activity !== '' && this.state.type === '';
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
          <div className="form-title">New Team Workout</div>
          {!this.showActivitySelect() &&
            <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
          }
          {this.showActivitySelect() &&
            <div className='form-row activity'>
              <button id="erg-select" className="activity-select" onClick={this.onErgSelect}>Erg</button>
              <button id="row-select" className="activity-select" onClick={this.onRowSelect}>Row</button>
              <button id="run-select" className="activity-select" onClick={this.onRunSelect}>Run</button>
              <button id="bike-select" className="activity-select" onClick={this.onBikeSelect}>Bike</button>
            </div>
          }
          {this.showTypeSelect() &&
            <div className='form-row type'>
              <button className="type-select" onClick={this.onDistSelect}>Distance</button>
              <button className="type-select" onClick={this.onTimeSelect}>Time</button>
            </div>
          }
          {this.state.type === 'distance' &&
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
          }
          {this.state.type === 'time' &&
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
              {this.state.activity}
            </div>
          }
          <div>{this.state.statusMessage}</div>
          {!this.showActivitySelect() && !this.showTypeSelect() &&
            <button type="submit" className="modal-submit">Submit</button>
          }
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
        </form>
      </div>
    );
  }
}

export default AddTeamWorkoutForm;
