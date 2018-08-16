import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signUpAthlete, signUpCoach } from '../actions/auth';
import { checkTeamNameAvailability, checkTeamCodeValidity } from '../actions/team';

const mapStateToProps = state => (
  {
    teamNameIsAvailable: state.team.teamNameIsAvailable,
    teamCodeIsValid: state.team.teamCodeIsValid,
  }
);

class SignUp extends Component {
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
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.shouldDisableNextButton = this.shouldDisableNextButton.bind(this);
    this.shouldShowTeamCode = this.shouldShowTeamCode.bind(this);
    this.shouldShowTeamName = this.shouldShowTeamName.bind(this);
    this.shouldShowAvailableIcon = this.shouldShowAvailableIcon.bind(this);
    this.shouldShowValidIcon = this.shouldShowValidIcon.bind(this);
  }

  componentDidMount() {
    document.body.style.background = 'url("/img/erging-compressed.jpg") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  }

  componentWillUnmount() {
    document.body.style.background = null;
    document.body.style.backgroundSize = null;
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

  async onTeamCodeChange(event) {
    await this.setState({ teamCode: event.target.value });

    if (this.state.teamCode !== '') {
      this.props.checkTeamCodeValidity(this.state.teamCode);
    }
  }

  async onTeamNameChange(event) {
    await this.setState({ teamName: event.target.value });

    if (this.state.teamName !== '') {
      this.props.checkTeamNameAvailability(this.state.teamName);
    }
  }

  onPhoneNumberChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  async onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const teamName = this.state.teamName;
    const teamCode = this.state.teamCode;

    if (this.state.userType === 'athlete') {
      const userObject = { name, email, password, teamCode };
      await this.props.signUpAthlete(userObject, this.props.history);
    } else if (this.state.userType === 'coach') {
      const userObject = { name, email, password, teamName };
      await this.props.signUpCoach(userObject, this.props.history);
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
                className={this.state.userType === 'athlete' ? 'athlete' : 'disabled'}
                type='button'
                onClick={this.onAthleteSelect}
              >
                Athlete
              </button>
              <button
                className={this.state.userType === 'coach' ? 'coach' : 'disabled'}
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
          {this.state.firstStepComplete &&
            <div>
              <div className="name field">
                <input
                  onChange={this.onNameChange}
                  value={this.state.name}
                  type="text"
                  required
                  placeholder='Name'
                />
              </div>
              <div className="email field">
                <input
                  onChange={this.onEmailChange}
                  value={this.state.email}
                  type="text"
                  required
                  placeholder='Email'
                />
              </div>
              <div className="password field">
                <input
                  onChange={this.onPasswordChange}
                  value={this.state.password}
                  type="password"
                  required
                  placeholder='Password'
                />
              </div>
              <div className='field'>
                <button type="submit" className="signup-button">Sign Up</button>
                <br />
                <button className='back-button' onClick={() => {
                  this.setState({ firstStepComplete: false });
                }}
                >
                Back
                </button>
              </div>
            </div>
          }
          {!this.state.firstStepComplete &&
            <div>
              <button className='next-button' disabled={this.shouldDisableNextButton()} onClick={() => {
                this.setState({ firstStepComplete: true });
              }}
              >
              Next
              </button>
              <br />
              <NavLink to="/">
                <button className="back-button">Back</button>
              </NavLink>
            </div>
          }
        </form>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { signUpAthlete, signUpCoach, checkTeamNameAvailability, checkTeamCodeValidity })(SignUp));
