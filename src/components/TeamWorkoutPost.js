import React, { Component } from 'react';
import round from 'lodash.round';

class TeamWorkoutPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      activity: '',
      distance: '',
      distUnit: '',
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
    this.onLocalResultAddClick = this.onLocalResultAddClick.bind(this);
    this.onLocalDeleteClick = this.onLocalDeleteClick.bind(this);
    this.onLocalEditClick = this.onLocalEditClick.bind(this);
    this.onLocalViewClick = this.onLocalViewClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
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
    }

    this.setState({
      activity: this.props.teamWorkout.activity,
      distance: this.props.teamWorkout.distance,
      distUnit: this.props.teamWorkout.distUnit,
      type: this.props.teamWorkout.type,
    });
  }

  onLocalResultAddClick(event) {
    this.props.onResultAddClick(this.props.teamWorkout._id);
  }

  onLocalEditClick(event) {
    this.setState({ isEditing: true });
  }

  onLocalDeleteClick(event) {
    this.props.onDeleteClick(this.props.teamWorkout._id, this.props.teamWorkout._team);
  }

  onLocalViewClick(event) {
    this.props.onViewResultsClick(this.props.teamWorkout._id, this.props.teamWorkout.type);
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

  onCancelClick(event) {
    this.setState({ isEditing: false });
  }

  async onSubmit(event) {
    event.preventDefault();
    const activity = this.state.activity;
    const distance = this.state.distance;
    const distUnit = this.state.distUnit;
    const time = this.timeConvert();
    const teamWorkoutObject = {
      activity, distance, distUnit, time,
    };
    await this.props.updateTeamWorkout(this.props.teamWorkout._id, teamWorkoutObject);
    this.setState({
      isEditing: false,
    });
  }

  /* convert the strings of each time values into the total number of seconds */
  timeConvert() {
    return ((parseFloat(this.state.hours, 10) * 3600) +
            (parseFloat(this.state.minutes, 10) * 60) +
            (parseFloat(this.state.seconds, 10).toPrecision(3) * 1));
  }

  render() {
    if (this.state.isEditing) {
      return (
        <form className="team-workout-post edit" key={this.props.index} onSubmit={this.onSubmit}>
          {this.state.type === 'distance' &&
            <div className="row-unit">
              <input className='input-md' onChange={this.onDistanceChange} value={this.state.distance} type="text" />
              <div>{this.props.teamWorkout.distUnit} {this.props.teamWorkout.activity}</div>
            </div>
          }
          {this.state.type === 'time' &&
            <div className='row-unit'>
              <div>H</div>
              <input className='input-sm' onChange={this.onHoursChange} value={this.state.hours} type="text" />
              <div>M</div>
              <input className='input-sm' onChange={this.onMinutesChange} value={this.state.minutes} type="text" />
              <div>S</div>
              <input className='input-sm' onChange={this.onSecondsChange} value={this.state.seconds} type="text" />
            </div>
          }
          <div className="row-unit">
            <select value={this.state.activity} onChange={this.onActivityChange}>
              <option default>Select</option>
              <option value="erg">Ergometer</option>
              <option value="row">Rowing</option>
              <option value="run">Running</option>
              <option value="bike">Cycling</option>
            </select>
          </div>
          <div className='row-unit'>
            <select value={this.state.distUnit} onChange={this.onDistUnitChange}>
              <option default>Select</option>
              <option value="m">m</option>
              <option value="km">km</option>
              <option value="mi">mi</option>
            </select>
          </div>
          <div className='row-unit'>
            <button type="button" className="workout-edit-cancel" onClick={this.onCancelClick}><i className="fas fa-times" /></button>
            <button type="submit" className="workout-edit-submit"><i className="fas fa-check" /></button>
          </div>
        </form>
      );
    } else {
      return (
        <div className="team-workout-post">
          <div><strong>Team</strong></div>
          <div className="row-unit">
            {this.props.teamWorkout.type === 'distance' &&
              <div>{this.props.teamWorkout.distance} {this.props.teamWorkout.distUnit} {this.props.teamWorkout.activity}</div>
            }
            {this.props.teamWorkout.type === 'time' &&
              <div>{this.props.teamWorkout.timeString} {this.props.teamWorkout.activity}</div>
            }
          </div>
          <div className="row-unit">
            {this.props.isCoach &&
              <button id="result-modal-button" onClick={this.onLocalResultAddClick}>Add Result</button>
            }
            <button id="view-result-modal-button" onClick={this.onLocalViewClick}>View</button>
          </div>
          {this.props.isCoach &&
            <div className="icon row-unit">
              <i onClick={this.onLocalEditClick} className="fas fa-edit" />
              <i onClick={this.onLocalDeleteClick} className="fas fa-trash" />
            </div>
          }
        </div>
      );
    }
  }
}

export default TeamWorkoutPost;
