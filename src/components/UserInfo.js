import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: '',
      position: '',
      weight: '',
      classYear: '',
      nameIsValid: true,
      weightIsValid: true,
      classYearIsValid: true,
    };

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPositionChange = this.onPositionChange.bind(this);
    this.onWeightChange = this.onWeightChange.bind(this);
    this.onClassYearChange = this.onClassYearChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      position: this.props.user.position,
      weight: this.props.user.weight,
      classYear: this.props.user.classYear,
    });
  }

  onCancelClick(event) {
    this.setState({
      isEditing: false,
      name: this.props.user.name,
      position: this.props.user.position,
      weight: this.props.user.weight,
      classYear: this.props.user.classYear,
      statusMessage: '',
      nameIsValid: true,
      weightIsValid: true,
      classYearIsValid: true,
    });
  }

  onEditClick(event) {
    this.setState({ isEditing: true });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onPositionChange(event) {
    this.setState({ position: event.target.value });
  }

  onWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  onClassYearChange(event) {
    this.setState({ classYear: event.target.value });
  }

  async onSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      const name = this.state.name;
      const position = this.state.position;
      const weight = this.state.weight;
      const classYear = this.state.classYear;
      const userObject = {
        name, position, weight, classYear,
      };
      await this.props.updateUser(this.props.user._id, userObject);
      if (this.props.profileIsUpdated) {
        this.setState({
          isEditing: false,
        });
      }
    }
  }

  validateInput() {
    this.setState({
      statusMessage: '',
      nameIsValid: true,
      weightIsValid: true,
      classYearIsValid: true,
    });
    let isValid = true;
    const message = 'One or more input parameters are invalid.';
    if (/^[a-z0-9 _]+$/i.test(this.state.name) === false) {
      this.setState({ statusMessage: message, nameIsValid: false });
      isValid = false;
    }
    if (this.state.weight !== '' && isNaN(this.state.weight)) {
      this.setState({ statusMessage: message, weightIsValid: false });
      isValid = false;
    }
    if (this.state.classYear && (/^[0-9]{0,4}$/i.test(this.state.classYear) === false)) {
      this.setState({ statusMessage: message, classYearIsValid: false });
      isValid = false;
    }
    return isValid;
  }

  render() {
    if (this.state.isEditing) {
      return (
        <form className="user-info edit" onSubmit={this.onSubmit}>
          <div className='content p-sm'>
            <div className='col-unit'>
              <div className='p-extra-sm'>Name</div>
              <input
                className={`name ${!this.state.nameIsValid && 'invalid'}`}
                onChange={this.onNameChange}
                value={this.state.name}
                type="text"
                required
              />
            </div>
          </div>
          <div className='content p-sm'>
            {!this.props.isCoach &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Weight</div>
                <input
                  className={`num weight ${!this.state.weightIsValid && 'invalid'}`}
                  onChange={this.onWeightChange}
                  value={this.state.weight}
                  type="text"
                />
              </div>
            }
            {!this.props.isCoach &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Position</div>
                <select
                  className='num position'
                  value={this.state.position}
                  onChange={this.onPositionChange}
                >
                  <option default value="">Select</option>
                  <option value="Port">Port</option>
                  <option value="Starboard">Starboard</option>
                  <option value="Port/Starboard">Port/Starboard</option>
                  <option value="Coxswain">Coxswain</option>
                  <option value="Sculler">Sculler</option>
                </select>
              </div>
            }
            {!this.props.isCoach &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Class Year</div>
                <input
                  className={`num class-year ${!this.state.classYearIsValid && 'invalid'}`}
                  onChange={this.onClassYearChange}
                  value={this.state.classYear}
                  type="text"
                />
              </div>
            }
          </div>
          <div className='status-text error'>
            {this.state.statusMessage}
          </div>
          <div className='btn-row'>
            <button type="button" className="btn-hollow-1" onClick={this.onCancelClick}>Cancel</button>
            <button type="submit" className="btn-hollow-2">Save</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className="user-info">
          <div className='h1 ctr'>{this.props.user.name}</div>
          <div className='content h3-light'>
            <div className='col-unit'>
              <div className='p-extra-sm'>Team</div>
              <div className="h3-light">{this.props.team.name}</div>
            </div>
          </div>
          <div className='content h3-light'>
            {this.props.user.weight !== null && this.props.user.weight !== 0 && !this.props.isCoach &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Weight</div>
                <div>{this.props.user.weight} lb</div>
              </div>
            }
            {this.props.user.position && !this.props.isCoach &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Position</div>
                <div>{this.props.user.position}</div>
              </div>
            }
            {this.props.user.classYear !== null && this.props.user.classYear !== 0 && !this.props.isCoach &&
              <div className='col-unit'>
                <div className='p-extra-sm'>Class Year</div>
                <div>{this.props.user.classYear}</div>
              </div>
            }
          </div>
          {this.props.currentUserId === this.props.user._id &&
            <div className='footer'>
              <button className='btn-hollow-1' onClick={this.onEditClick}>Edit Profile</button>
            </div>
          }
        </div>
      );
    }
  }
}

UserInfo.propTypes = {
  currentUserId: PropTypes.string,
  isCoach: PropTypes.bool,
  profileIsUpdated: PropTypes.bool,
  team: PropTypes.object,
  updateUser: PropTypes.func,
  user: PropTypes.object,
};

export default UserInfo;
