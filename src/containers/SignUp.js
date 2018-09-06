import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signUpAthlete, signUpCoach, resetAuth } from '../actions/auth';
import { checkTeamName, checkTeamCode } from '../actions/team';
import SignUpForm from '../components/forms/SignUpForm';
import UserTypeForm from '../components/forms/UserTypeForm';

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
    this.props.resetAuth();
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

  render() {
    return (
      <div className='sign-up-container'>
        {this.state.firstStepComplete ? (
          <SignUpForm
            email={this.state.email}
            name={this.state.name}
            onBackClick={this.onBackClick}
            onEmailChange={this.onEmailChange}
            onNameChange={this.onNameChange}
            onPasswordChange={this.onPasswordChange}
            onSubmit={this.onSubmit}
            password={this.state.password}
            statusText={this.props.statusText}
          />
        ) : (
          <UserTypeForm
            onAthleteSelect={this.onAthleteSelect}
            onCoachSelect={this.onCoachSelect}
            onNextClick={this.onNextClick}
            onTeamCodeChange={this.onTeamCodeChange}
            onTeamNameChange={this.onTeamNameChange}
            disableNextButton={this.shouldDisableNextButton()}
            teamCode={this.state.teamCode}
            teamCodeIsValid={this.props.teamCodeIsValid}
            teamName={this.state.teamName}
            teamNameIsAvailable={this.props.teamNameIsAvailable}
            userType={this.state.userType}
          />
        )
        }
        <div className='line' />
        <div className='info-box'>
          <div className='col even'>
            <div className='p'>&copy; 2018 QuantiTeam. All rights reserved.</div>
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps, { resetAuth, signUpAthlete, signUpCoach, checkTeamName, checkTeamCode })(SignUp));
