import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import timeStringToSeconds from '../utils/workout';

class TeamWorkoutPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      activity: '',
      distance: '',
      distUnit: '',
      timeString: '',
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
    };

    this.onActivityChange = this.onActivityChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onDistUnitChange = this.onDistUnitChange.bind(this);
    this.onTimeStringChange = this.onTimeStringChange.bind(this);
    this.onRecordClick = this.onRecordClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      distance: this.props.teamWorkout.distance || '',
      timeString: this.props.teamWorkout.timeString || '',
      activity: this.props.teamWorkout.activity,
      distUnit: this.props.teamWorkout.distUnit,
      type: this.props.teamWorkout.type,
    });
  }

  onRecordClick(event) {
    this.props.onAddResultClick(this.props.teamWorkout._id);
  }

  onEditClick(event) {
    this.setState({ isEditing: true });
  }

  onDeleteClick(event) {
    this.props.deleteTeamWorkout(this.props.teamWorkout._id, this.props.teamWorkout._team);
  }

  onViewClick(event) {
    this.props.onViewResultsClick(this.props.teamWorkout._id, this.props.teamWorkout.type);
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

  onTimeStringChange(event) {
    this.setState({ timeString: event.target.value });
  }

  onCancelClick(event) {
    this.setState({
      isEditing: false,
      activity: this.props.teamWorkout.activity,
      distance: this.props.teamWorkout.distance || '',
      distUnit: this.props.teamWorkout.distUnit,
      timeString: this.props.teamWorkout.timeString || '',
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      const activity = this.state.activity;
      const distance = this.state.distance;
      const distUnit = this.state.distUnit;
      const time = timeStringToSeconds(this.state.timeString);
      const teamWorkoutObject = {
        activity, distance, distUnit, time,
      };
      await this.props.updateTeamWorkout(this.props.teamWorkout._id, teamWorkoutObject);
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
    return isValid;
  }

  render() {
    const date = this.props.teamWorkout.date;
    const dateObject = new Date(date);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear().toString().substr(-2);
    const dateString = `${month}/${day}/${year}`;

    if (this.state.isEditing) {
      return (
        <form className="team-workout-post edit" key={this.props.index} onSubmit={this.onSubmit}>
          <div className='header'>
            <NavLink className='profile-link' to='/team'>
              <strong>Team</strong>
            </NavLink>
            <div>{dateString}</div>
          </div>
          <div className='content'>
            {this.state.type === 'distance' &&
              <div className="row-unit">
                <input
                  className={`distance input-md ${this.state.distanceIsValid ? '' : 'invalid'}`}
                  onChange={this.onDistanceChange}
                  value={this.state.distance}
                  type="text"
                />
                <div>{this.props.teamWorkout.distUnit} {this.props.teamWorkout.activity}</div>
              </div>
            }
            {this.state.type === 'time' &&
              <div className='row-unit'>
                <input
                  className={`time-string input-md ${this.state.timeIsValid ? '' : 'invalid'}`}
                  onChange={this.onTimeStringChange}
                  value={this.state.timeString}
                  type="text"
                />
              </div>
            }
            <div className="row-unit">
              <select className='activity' value={this.state.activity} onChange={this.onActivityChange}>
                <option value="erg">Erg</option>
                <option value="row">Row</option>
                <option value="run">Run</option>
                <option value="bike">Bike</option>
              </select>
            </div>
            <div className='row-unit'>
              <select className='dist-unit' value={this.state.distUnit} onChange={this.onDistUnitChange}>
                <option value="m">m</option>
                <option value="km">km</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </div>
          <div className='footer'>
            {this.state.statusMessage !== '' &&
              <div className='status-text error'>{this.state.statusMessage}</div>
            }
            <div className='row-unit'>
              <button type="button" className="workout-edit-cancel" onClick={this.onCancelClick}><i className="fas fa-times" /></button>
              <button type="submit" className="workout-edit-submit"><i className="fas fa-check" /></button>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <div className="team-workout-post">
          <div className='header'>
            <NavLink className='profile-link' to='/team'>
              <strong>Team</strong>
            </NavLink>
            <div>{dateString}</div>
          </div>
          <div className='content'>
            <div className="row-unit data">
              {this.props.teamWorkout.type === 'distance' &&
                <div className='distance'>{this.props.teamWorkout.distance} {this.props.teamWorkout.distUnit} {this.props.teamWorkout.activity}</div>
              }
              {this.props.teamWorkout.type === 'time' &&
                <div className='time'>{this.props.teamWorkout.timeString} {this.props.teamWorkout.activity}</div>
              }
            </div>
            <div className="row-unit button">
              {this.props.isCoach &&
                <button id="result-modal-button" onClick={this.onRecordClick}>Record</button>
              }
              <button id="view-result-modal-button" onClick={this.onViewClick}>View</button>
            </div>
          </div>
          <div className='footer'>
            {this.props.isCoach &&
              <div className="icon row-unit">
                <i onClick={this.onEditClick} className="fas fa-edit" />
                <i onClick={this.onDeleteClick} className="fas fa-trash" />
              </div>
            }
          </div>
        </div>
      );
    }
  }
}

TeamWorkoutPost.propTypes = {
  deleteTeamWorkout: PropTypes.func,
  isCoach: PropTypes.bool,
  onAddResultClick: PropTypes.func,
  onViewResultsClick: PropTypes.func,
  teamWorkout: PropTypes.object,
  updateTeamWorkout: PropTypes.func,
};

export default TeamWorkoutPost;
