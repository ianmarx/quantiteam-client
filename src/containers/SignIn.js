import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signInUser, resetAuth } from '../actions/auth';

export const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.isAuthenticated,
    statusText: state.auth.statusText,
  }
);

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.replace('/');
    }
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const userObject = { email, password };
    this.props.signInUser(userObject, this.props.history);
  }

  render() {
    return (
      <div className='sign-in-container'>
        <form className='sign-in-form' onSubmit={this.onSubmit}>
          <div className='h0'>Sign In</div>
          <div className="field">
            <div className='h2-light'>Email</div>
            <input
              className='email'
              onChange={this.onEmailChange}
              value={this.state.email}
              type="text"
              required
              autoFocus
              autoComplete='email'
            />
          </div>
          <div className="field">
            <div className='h2-light'>Password</div>
            <input
              className='password'
              onChange={this.onPasswordChange}
              value={this.state.password}
              type="password"
              required
              autoComplete='current-password'
            />
          </div>
          <div className='status-text p'>
            {(this.props.statusText === 'Unauthorized') ? 'The email/password combination was not found.' : this.props.statusText}
          </div>
          <button type="submit" className="btn-submit">Sign In</button>
          <NavLink className='btn-prev' onClick={this.props.resetAuth} to="/">Back</NavLink>
          <div className="already-user">
            Not on a team yet? <NavLink to='/signup'><strong>Sign up here.</strong></NavLink>
          </div>
        </form>
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

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  statusText: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, { signInUser, resetAuth })(SignIn));
