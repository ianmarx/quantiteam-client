import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signInUser } from '../actions/auth';

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
      <div className="sign-in-form">
        <form onSubmit={this.onSubmit}>
          <h2>Sign In</h2>
          <div className="field">
            <input
              className='email'
              onChange={this.onEmailChange}
              value={this.state.email}
              type="text"
              required
              autoFocus
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
              autoComplete='current-password'
            />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
          <NavLink to="/">
            <button className="back-button">Back</button>
          </NavLink>
          {this.props.statusText &&
            <div className='status-text'>{this.props.statusText}</div>
          }
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  statusText: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, { signInUser })(SignIn));
