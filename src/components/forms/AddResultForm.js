import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeStringToSeconds from '../../utils/workout';

class AddResultForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      distance: '',
      athleteName: '',
      timeString: '',
      strokeRate: '',
      watts: '',
      avgHR: '',
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
      strokeRateIsValid: true,
      avgHRIsValid: true,
      wattsIsValid: true,
    };

    this.onAthleteNameChange = this.onAthleteNameChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onHeartRateChange = this.onHeartRateChange.bind(this);
    this.onTimeStringChange = this.onTimeStringChange.bind(this);
    this.onStrokeRateChange = this.onStrokeRateChange.bind(this);
    this.onWattsChange = this.onWattsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    if (this.props.teamWorkout.type === 'time') {
      this.setState({
        timeString: this.props.teamWorkout.timeString,
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

  onAthleteNameChange(event) {
    this.setState({ athleteName: event.target.value }, () => {
      if (/^[a-z0-9 _]+$/i.test(this.state.athleteName)) {
        this.props.matchAthlete(this.state.athleteName, this.props.teamWorkout._team);
      }
    });
  }

  onDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }

  onTimeStringChange(event) {
    this.setState({ timeString: event.target.value });
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
    if (this.validateInput()) {
      const activity = this.props.teamWorkout.activity;
      const distance = this.state.distance;
      const distUnit = this.props.teamWorkout.distUnit;
      const time = timeStringToSeconds(this.state.timeString);
      const strokeRate = this.state.strokeRate;
      const watts = this.state.watts;
      const avgHR = this.state.avgHR;
      const athleteName = this.state.athleteName;
      const resultObject = { athleteName, activity, distance, distUnit, time, strokeRate, watts, avgHR };
      await this.props.addResult(resultObject, this.props.teamWorkout._id);
      this.props.onModalClose();
    }
  }

  validateInput() {
    this.setState({
      statusMessage: '',
      distanceIsValid: true,
      timeIsValid: true,
      strokeRateIsValid: true,
      avgHRIsValid: true,
      wattsIsValid: true,
    });
    let isValid = true;
    const invalidMessage = 'One or more input parameters are invalid.';
    if (isNaN(this.state.distance)) {
      this.setState({ statusMessage: invalidMessage, distanceIsValid: false });
      isValid = false;
    }
    if (isNaN(timeStringToSeconds(this.state.timeString))) {
      this.setState({ statusMessage: invalidMessage, timeIsValid: false });
      isValid = false;
    }
    if (this.state.strokeRate !== '' && isNaN(this.state.strokeRate)) {
      this.setState({ statusMessage: invalidMessage, strokeRateIsValid: false });
      isValid = false;
    }
    if (this.state.avgHR !== '' && isNaN(this.state.avgHR)) {
      this.setState({ statusMessage: invalidMessage, avgHRIsValid: false });
      isValid = false;
    }
    if (this.state.watts !== '' && isNaN(this.state.watts)) {
      this.setState({ statusMessage: invalidMessage, wattsIsValid: false });
      isValid = false;
    }
    return isValid;
  }

  render() {
    return (
      <form className="modal-form" autoComplete='off' onSubmit={this.onSubmit}>
        <div className="h1 cap-1">Add Result</div>
        <div className='row-unit'>
          <div className='col-unit p'>
            <div className='p-sm bold'>Athlete *</div>
            <input
              className='athlete-name input-extra-lg'
              list="athletes"
              onChange={this.onAthleteNameChange}
              value={this.state.athleteName}
              type="text"
              required
            />
            <datalist id="athletes">
              {this.props.queryResults && this.props.queryResults.map((athlete, i) => {
                return (
                  <option key={i} value={athlete.name} />
                );
              })}
            </datalist>
          </div>
        </div>
        <div className='row-unit'>
          {this.state.type === 'time' &&
            <div className='col-unit p'>
              <div className='p-sm bold'>Distance ({this.props.teamWorkout.distUnit}) *</div>
              <input
                className={`input-lg distance ${this.state.distanceIsValid ? '' : 'invalid'}`}
                onChange={this.onDistanceChange}
                value={this.state.distance}
                type="text"
                autoComplete='off'
                required
              />
            </div>
          }
          {this.state.type === 'distance' &&
            <div className='col-unit p'>
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
          }
        </div>
        <div className='row-unit'>
          <div className='col-unit'>
            <div className='p-sm bold'>Heart Rate (bpm)</div>
            <input
              className={`heart-rate ${this.state.avgHRIsValid ? '' : 'invalid'}`}
              onChange={this.onHeartRateChange}
              value={this.state.avgHR}
              type="text"
            />
          </div>
          {(this.props.teamWorkout.activity === 'erg' || this.props.teamWorkout.activity === 'row') &&
            <div className='col-unit p'>
              <div className='p-sm bold'>Stroke Rate (s/m)</div>
              <input
                className={`stroke-rate ${this.state.strokeRateIsValid ? '' : 'invalid'}`}
                onChange={this.onStrokeRateChange}
                value={this.state.strokeRate}
                type="text"
              />
            </div>
          }
          {(this.props.teamWorkout.activity === 'bike') &&
            <div className='col-unit p'>
              <div className='p-sm bold'>Watts</div>
              <input
                className={`watts ${this.state.wattsIsValid ? '' : 'invalid'}`}
                onChange={this.onWattsChange}
                value={this.state.watts}
                type="text"
              />
            </div>
          }
        </div>
        <div className='status-text error'>{this.state.statusMessage}</div>
        <button type="submit" className="modal-submit">Submit</button>
        <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
        <div id='required-msg' className='p-extra-sm'>* indicates a required field.</div>
      </form>
    );
  }
}

AddResultForm.propTypes = {
  teamWorkout: PropTypes.object,
  queryResults: PropTypes.array,
  matchAthlete: PropTypes.func,
  addResult: PropTypes.func,
  onModalClose: PropTypes.func,
};

export default AddResultForm;
