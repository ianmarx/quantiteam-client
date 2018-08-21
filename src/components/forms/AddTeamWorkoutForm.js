import React, { Component } from 'react';
import timeStringToSeconds from '../../utils/workout';

class AddTeamWorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      activity: '',
      distUnit: '',
      distance: '',
      timeString: '',
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
    };

    this.onErgSelect = this.onErgSelect.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onRunSelect = this.onRunSelect.bind(this);
    this.onBikeSelect = this.onBikeSelect.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onTimeStringChange = this.onTimeStringChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDistSelect = this.onDistSelect.bind(this);
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showActivitySelect = this.showActivitySelect.bind(this);
    this.showTypeSelect = this.showTypeSelect.bind(this);
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

  onTimeStringChange(event) {
    this.setState({ timeString: event.target.value });
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
      this.setState({
        type: '',
        distance: '',
        statusMessage: '',
        timeString: '',
        distanceIsValid: true,
        timeIsValid: true,
      });
    }
    if (this.showTypeSelect()) {
      this.setState({ activity: '' });
    }
  }

  /* Add a workout using the form */
  async onSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      const activity = this.state.activity;
      const distance = this.state.distance;
      const distUnit = this.state.distUnit;
      const time = timeStringToSeconds(this.state.timeString);
      const teamId = this.props.teamId;
      const type = this.state.type;
      const workoutObject = { activity, distance, distUnit, time, teamId, type };
      await this.props.addTeamWorkout(workoutObject, this.props.userId);
      this.props.onModalClose();
    }
  }

  validateInput() {
    this.setState({
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
    });
    let isValid = true;
    const invalidMessage = 'The input parameter is invalid.';
    if (this.state.distance !== '' && isNaN(this.state.distance)) {
      this.setState({ statusMessage: invalidMessage, distanceIsValid: false });
      isValid = false;
    }
    if (this.state.timeString !== '' && isNaN(timeStringToSeconds(this.state.timeString))) {
      this.setState({ statusMessage: invalidMessage, timeIsValid: false });
      isValid = false;
    }
    return isValid;
  }

  showActivitySelect() {
    return this.state.activity === '' && this.state.type === '';
  }

  showTypeSelect() {
    return this.state.activity !== '' && this.state.type === '';
  }

  render() {
    return (
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
              className={`${this.state.distanceIsValid ? '' : 'invalid'}`}
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
              className={`${this.state.timeIsValid ? '' : 'invalid'}`}
              onChange={this.onTimeStringChange}
              value={this.state.timeString}
              type="text"
              placeholder='Time'
              autoComplete='off'
              required
            />
            {this.state.activity}
          </div>
        }
        {this.state.statusMessage !== '' &&
          <div className='status-text error'>{this.state.statusMessage}</div>
        }
        {!this.showActivitySelect() && !this.showTypeSelect() &&
          <button type="submit" className="modal-submit">Submit</button>
        }
        <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
      </form>
    );
  }
}

export default AddTeamWorkoutForm;
