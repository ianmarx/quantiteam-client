import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signInUser } from '../actions';

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
    document.body.style.background = 'url("/img/erging.jpg") no-repeat center center fixed';
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
    console.log('Sign in request submitted');
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
            />
          </div>
          <div className="password field">
            <input onChange={this.onPasswordChange}
              value={this.state.password}
              type="password"
              required
              placeholder='Password'
            />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
          <NavLink to="/">
            <button className="back-button">Back</button>
          </NavLink>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signInUser })(SignIn));
