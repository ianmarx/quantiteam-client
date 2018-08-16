import React, { Component } from 'react';
import round from 'lodash.round';

class ResultPost extends Component {
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
      strokeRate: '',
      watts: '',
      avgHR: '',
    };

    this.onActivityChange = this.onActivityChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onDistUnitChange = this.onDistUnitChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onLocalDeleteClick = this.onLocalDeleteClick.bind(this);
    this.onLocalEditClick = this.onLocalEditClick.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    /* split up the time value into separate units for editing mode */
    const h = Math.floor(this.props.workout.time / 3600);
    const remainder = this.props.workout.time % 3600;
    const m = Math.floor(remainder / 60);
    const s = round((remainder % 60), 1);

    this.setState({
      activity: this.props.workout.activity,
      distance: this.props.workout.distance,
      distUnit: this.props.workout.distUnit,
      hours: h,
      minutes: m,
      seconds: s,
      strokeRate: this.props.workout.strokeRate || '',
      watts: this.props.workout.watts || '',
      avgHR: this.props.workout.avgHR || '',
    });
  }

  onLocalEditClick(event) {
    this.setState({ isEditing: true });
  }

  onLocalDeleteClick(event) {
    this.props.onDeleteClick(this.props.workout._id, this.props.teamWorkoutId);
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

  onStrokeRateChange(event) {
    this.setState({ strokeRate: event.target.value });
  }

  onWattsChange(event) {
    this.setState({ watts: event.target.value });
  }

  onHeartRateChange(event) {
    this.setState({ avgHR: event.target.value });
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
    const strokeRate = this.state.strokeRate;
    const watts = this.state.watts;
    const avgHR = this.state.avgHR;
    const workoutObject = {
      activity, distance, distUnit, time, strokeRate, watts, avgHR,
    };
    await this.props.updateResult(this.props.workout._id, workoutObject);
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
        <form className="result-post edit" key={this.props.index} onSubmit={this.onSubmit}>
          {this.props.type === 'time' &&
            <div className='row-unit'>
              <input className='input-md' onChange={this.onDistanceChange} value={this.state.distance} type="text" />
              <div>{this.props.workout.distUnit}</div>
            </div>
          }
          {this.props.type === 'distance' &&
            <div className='row-unit'>
              <div>H</div>
              <input className='input-sm' onChange={this.onHoursChange} value={this.state.hours} type="text" />
              <div>M</div>
              <input className='input-sm' onChange={this.onMinutesChange} value={this.state.minutes} type="text" />
              <div>S</div>
              <input className='input-sm' onChange={this.onSecondsChange} value={this.state.seconds} type="text" />
            </div>
          }
          <div className='row-unit'>
            <input className='input-sm' onChange={this.onHeartRateChange}
              value={this.state.avgHR}
              type="text"
            />
            <div>bpm</div>
          </div>
          <div className='row-unit'>
            <input className='input-sm' onChange={this.onStrokeRateChange}
              value={this.state.strokeRate}
              type="text"
            />
            <div>s/m</div>
          </div>
          <div className='row-unit'>
            <button type="button" className="workout-edit-cancel" onClick={this.onCancelClick}><i className="fas fa-times" /></button>
            <button type="submit" className="workout-edit-submit"><i className="fas fa-check" /></button>
          </div>
        </form>
      );
    } else {
      return (
        <div className="result-post" key={this.props.index}>
          <div className='athlete-name'>
            <strong>{this.props.workout.creatorName}</strong>
          </div>
          {this.props.type === 'time' &&
            <div>{this.props.workout.distance} {this.props.workout.distUnit}</div>
          }
          {this.props.type === 'distance' &&
            <div>{this.props.workout.timeString}</div>
          }
          {this.props.workout.splitString &&
            <div>{this.props.workout.splitString} s/500m</div>
          }
          {this.props.workout.strokeRate &&
            <div>{this.props.workout.strokeRate} s/m</div>
          }
          {this.props.workout.avgHR &&
            <div>{this.props.workout.avgHR} bpm</div>
          }
          {this.props.isCoach &&
            <div className='row-unit'>
              <div className="icon">
                <i onClick={this.onLocalEditClick} className="fa fa-pencil-square-o" />
              </div>
              <div className="icon">
                <i onClick={this.onLocalDeleteClick} className="fa fa-trash-o" />
              </div>
            </div>
          }
        </div>
      );
    }
  }
}

export default ResultPost;
