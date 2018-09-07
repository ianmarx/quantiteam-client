import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.onDistSelect = this.onDistSelect.bind(this);
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onDistSelect(event) {
    this.setState({ type: 'distance' });
  }

  onTimeSelect(event) {
    this.setState({ type: 'time' });
  }

  onPrevClick(event) {
    if (this.state.type !== '') {
      this.setState({
        type: '',
        distance: '',
        statusMessage: '',
        timeString: '',
        distanceIsValid: true,
        timeIsValid: true,
      });
    } else {
      this.setState({ activity: '' });
    }
  }

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
    let isValid = true;
    const invalidMessage = 'The input parameter is invalid.';

    /* reset validation-related variables */
    this.setState({
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
    });

    /* validate form input variables */
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

  render() {
    if (this.state.activity === '') {
      return (
        <div className="modal-form activity">
          <div className="h1">Add Team Workout</div>
          <button className="btn-select erg" onClick={this.onErgSelect}>Erg</button>
          <button className="btn-select row" onClick={this.onRowSelect}>Row</button>
          <button className="btn-select run" onClick={this.onRunSelect}>Run</button>
          <button className="btn-select bike" onClick={this.onBikeSelect}>Bike</button>
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
        </div>
      );
    } else if (this.state.type === '') {
      return (
        <div className='modal-form activity'>
          <div className="h1 cap-1">New Team {this.state.activity}</div>
          <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
          <button className="btn-option distance" onClick={this.onDistSelect}>Distance</button>
          <button className="btn-option time" onClick={this.onTimeSelect}>Time</button>
        </div>
      );
    } else {
      return (
        <form className="modal-form" onSubmit={this.onSubmit}>
          <div className="h1 cap-1">New Team {this.state.activity}</div>
          <button type="button" className="modal-prev" onClick={this.onPrevClick}>Back</button>
          {this.state.type === 'distance' &&
            <div className='row-unit'>
              <div className='col-unit'>
                <div className='p-sm bold'>Distance ({this.state.distUnit}) *</div>
                <input
                  className={`input-lg distance ${this.state.distanceIsValid ? '' : 'invalid'}`}
                  onChange={this.onDistanceChange}
                  value={this.state.distance}
                  type="text"
                  autoComplete='off'
                  required
                />
              </div>
            </div>
          }
          {this.state.type === 'time' &&
            <div className='row-unit'>
              <div className='col-unit'>
                <div className='p-sm bold'>Time *</div>
                <input
                  className={`input-lg time ${this.state.timeIsValid ? '' : 'invalid'}`}
                  onChange={this.onTimeStringChange}
                  value={this.state.timeString}
                  type="text"
                  placeholder='hh:mm:ss'
                  autoComplete='off'
                  required
                />
              </div>
            </div>
          }
          <div className='status-text error'>{this.state.statusMessage}</div>
          <button type="submit" className="modal-submit">Submit</button>
          <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
          <div id='required-msg' className='p-extra-sm'>* indicates a required field.</div>
        </form>
      );
    }
  }
}

AddTeamWorkoutForm.propTypes = {
  addTeamWorkout: PropTypes.func,
  onModalClose: PropTypes.func,
  userId: PropTypes.string,
  teamId: PropTypes.string,
};

export default AddTeamWorkoutForm;
