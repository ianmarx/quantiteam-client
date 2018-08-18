import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signInUser } from '../actions/auth';

const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
  }
);

class SignIn extends Component {
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
    document.body.style.background = 'url("/img/erging-compressed.jpg") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  }

  componentWillUnmount() {
    document.body.style.background = null;
    document.body.style.backgroundSize = null;
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
          <div className="email field">
            <input onChange={this.onEmailChange}
              value={this.state.email}
              type="text"
              required
              placeholder='Email'
              autoComplete='email'
            />
          </div>
          <div className="password field">
            <input onChange={this.onPasswordChange}
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
          <div className='status-text'>
            {this.props.isAuthenticating &&
              <div>Authorizing . . . </div>
            }
            {this.props.statusText === 'Unauthorized' &&
              <div>{this.props.statusText}: email/password not found.</div>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { signInUser })(SignIn));
