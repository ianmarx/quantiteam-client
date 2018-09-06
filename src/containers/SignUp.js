import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signUpAthlete, signUpCoach } from '../actions/auth';
import { checkTeamName, checkTeamCode } from '../actions/team';

export const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
    teamNameIsAvailable: state.team.teamNameIsAvailable,
    teamCodeIsValid: state.team.teamCodeIsValid,
  }
);

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      userType: 'athlete',
      teamCode: '',
      teamName: '',
      phoneNumber: '',
      firstStepComplete: false,
    };

    this.onAthleteSelect = this.onAthleteSelect.bind(this);
    this.onCoachSelect = this.onCoachSelect.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onTeamCodeChange = this.onTeamCodeChange.bind(this);
    this.onTeamNameChange = this.onTeamNameChange.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.shouldDisableNextButton = this.shouldDisableNextButton.bind(this);
    this.shouldShowTeamCode = this.shouldShowTeamCode.bind(this);
    this.shouldShowTeamName = this.shouldShowTeamName.bind(this);
    this.shouldShowAvailableIcon = this.shouldShowAvailableIcon.bind(this);
    this.shouldShowValidIcon = this.shouldShowValidIcon.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.replace('/');
    }
  }

  onAthleteSelect(event) {
    this.setState({ userType: 'athlete', teamCode: '' });
  }

  onCoachSelect(event) {
    this.setState({ userType: 'coach', teamName: '' });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onTeamCodeChange(event) {
    this.setState({ teamCode: event.target.value }, () => {
      if (this.state.teamCode !== '') {
        this.props.checkTeamCode(this.state.teamCode);
      }
    });
  }

  onTeamNameChange(event) {
    this.setState({ teamName: event.target.value }, () => {
      if (this.state.teamName !== '') {
        this.props.checkTeamName(this.state.teamName);
      }
    });
  }

  onNextClick(event) {
    this.setState({ firstStepComplete: true });
  }

  onBackClick(event) {
    this.setState({ firstStepComplete: false });
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const teamName = this.state.teamName;
    const teamCode = this.state.teamCode;
    const userType = this.state.userType;

    if (this.state.userType === 'athlete') {
      const userObject = { name, email, password, teamCode, userType };
      this.props.signUpAthlete(userObject, this.props.history);
    }
    if (this.state.userType === 'coach') {
      const userObject = { name, email, password, teamName, userType };
      this.props.signUpCoach(userObject, this.props.history);
    }
  }

  shouldDisableNextButton() {
    if (this.state.userType === 'athlete') {
      return (this.state.teamCode === '' || !this.props.teamCodeIsValid);
    } else {
      return (this.state.teamName === '' || !this.props.teamNameIsAvailable);
    }
  }

  shouldShowTeamCode() {
    return this.state.userType === 'athlete' && !this.state.firstStepComplete;
  }

  shouldShowTeamName() {
    return this.state.userType === 'coach' && !this.state.firstStepComplete;
  }

  shouldShowAvailableIcon() {
    return this.state.teamName !== '' && this.props.teamNameIsAvailable;
  }

  shouldShowValidIcon() {
    return this.state.teamCode !== '' && this.props.teamCodeIsValid;
  }


  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.onSubmit}>
          <h2>Sign Up</h2>
          {!this.state.firstStepComplete &&
            <div className='button-group'>
              <button
                className={`athlete ${this.state.userType !== 'athlete' && 'disabled'}`}
                type='button'
                onClick={this.onAthleteSelect}
              >
                Athlete
              </button>
              <button
                className={`coach ${this.state.userType !== 'coach' && 'disabled'}`}
                type='button'
                onClick={this.onCoachSelect}
              >
                Coach
              </button>
            </div>
          }
          {this.shouldShowTeamCode() &&
            <div className="team-code field">
              <div>Enter the team code provided by your coach.</div>
              <input
                className='team-code-input'
                onChange={this.onTeamCodeChange}
                value={this.state.teamCode}
                type="text"
                required
                placeholder='Team Code'
                autoFocus
                spellCheck={false}
              />
              {this.shouldShowValidIcon() &&
                <span className='fa-stack'>
                  <i className='fas fa-circle fa-stack-1x' />
                  <i className='fas fa-check-circle fa-stack-1x' />
                </span>
              }
            </div>
          }
          {this.shouldShowTeamName() &&
            <div className="team-name field">
              <div>Enter your desired team name to check availability.</div>
              <input
                className='team-name-input'
                onChange={this.onTeamNameChange}
                value={this.state.teamName}
                type="text"
                required
                placeholder='Team Name'
                autoFocus
                spellCheck={false}
              />
              {this.shouldShowAvailableIcon() &&
                <span className='fa-stack'>
                  <i className='fas fa-circle fa-stack-1x' />
                  <i className='fas fa-check-circle fa-stack-1x' />
                </span>
              }
            </div>
          }
          {this.state.firstStepComplete ? (
            <div>
              <div className="field">
                <input
                  className='name'
                  onChange={this.onNameChange}
                  value={this.state.name}
                  type="text"
                  required
                  placeholder='Name'
                  autoComplete='name'
                />
              </div>
              <div className="field">
                <input
                  className='email'
                  onChange={this.onEmailChange}
                  value={this.state.email}
                  type="text"
                  required
                  placeholder='Email'
                  autoComplete='email'
                />
              </div>
              <div className="field">
                <input
                  className='password'
                  onChange={this.onPasswordChange}
                  value={this.state.password}
                  type="password"
                  required
                  placeholder='Password'
                  autoComplete='new-password'
                />
              </div>
              <div className='field'>
                <button type="submit" className="signup-button">Sign Up</button>
                <br />
                <button className='back-button' onClick={this.onBackClick}>
                  Back
                </button>
              </div>
              {this.props.statusText &&
                <div className='status-text'>
                  {this.props.statusText}
                </div>
              }
            </div>
          ) : (
            <div>
              <button className='next-button' disabled={this.shouldDisableNextButton()} onClick={this.onNextClick}>
                Next
              </button>
              <br />
              <NavLink to="/">
                <button className="back-button">Back</button>
              </NavLink>
            </div>
          )}
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  statusText: PropTypes.string,
  teamCodeIsValid: PropTypes.bool,
  teamNameIsAvailable: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps, { signUpAthlete, signUpCoach, checkTeamName, checkTeamCode })(SignUp));
