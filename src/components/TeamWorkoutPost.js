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
          <div className='header p'>
            <div className='header-item'>
              <NavLink className='profile-link bold' to='/team'>Team</NavLink>
            </div>
            <div className='cap-1 ctr header-item'>{this.props.teamWorkout.activity}</div>
            <div className='header-item right'>{dateString}</div>
          </div>
          <div className='content p-sm'>
            <div className='col-unit'>
              {this.state.type === 'distance' &&
                <div className="row-unit">
                  <input
                    className={`distance input-md ${this.state.distanceIsValid ? '' : 'invalid'}`}
                    onChange={this.onDistanceChange}
                    value={this.state.distance}
                    type="text"
                  />
                  <div>{this.props.teamWorkout.distUnit}</div>
                </div>
              }
              {this.state.type === 'time' &&
                <div className='row-unit'>
                  <input
                    className={`time-string input-lg ${this.state.timeIsValid ? '' : 'invalid'}`}
                    onChange={this.onTimeStringChange}
                    value={this.state.timeString}
                    type="text"
                  />
                </div>
              }
            </div>
            <div className='col-unit'>
              <div className="row-unit">
                <select className='activity' value={this.state.activity} onChange={this.onActivityChange}>
                  <option value="erg">Erg</option>
                  <option value="row">Row</option>
                  <option value="run">Run</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
            </div>
            <div className='col-unit'>
              <div className='row-unit'>
                <select className='dist-unit' value={this.state.distUnit} onChange={this.onDistUnitChange}>
                  <option value="m">m</option>
                  <option value="km">km</option>
                  <option value="mi">mi</option>
                </select>
              </div>
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
          <div className='header p'>
            <div className='header-item'>
              <NavLink className='profile-link bold' to='/team'>Team</NavLink>
            </div>
            <div className='cap-1 ctr header-item'>{this.props.teamWorkout.activity}</div>
            <div className='header-item right'>{dateString}</div>
          </div>
          <div className='content h3-light'>
            <div className='col-unit'>
              <div className='p-extra-sm cap-1'>{this.props.teamWorkout.type}</div>
              {this.props.teamWorkout.type === 'distance' &&
                <div>{this.props.teamWorkout.distance} {this.props.teamWorkout.distUnit}</div>
              }
              {this.props.teamWorkout.type === 'time' &&
                <div>{this.props.teamWorkout.timeString}</div>
              }
            </div>
            <div className='row-unit btn'>
              {this.props.isCoach &&
                <button className='btn-modal-1' onClick={this.onRecordClick}>Add Result</button>
              }
              <button className="btn-modal-2" onClick={this.onViewClick}>View Results</button>
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
