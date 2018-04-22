import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signUpUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
    this.onNameChange = this.onNameChange.bind(this);
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
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  onSubmit(event) {
    console.log('Sign up request submitted');
    event.preventDefault();
    event.stopPropagation();

    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;

    const userObject = { name, email, password };
    this.props.signUpUser(userObject, this.props.history);
  }
  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.onSubmit}>
          <h2>Sign Up</h2>
          <div className="name field">
            <input onChange={this.onNameChange}
              value={this.state.name}
              type="text"
              required
              placeholder='Name'
            />
          </div>
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
          <button type="submit" className="signup-button">Sign Up</button>
          <NavLink to="/">
            <button className="back-button">Back</button>
          </NavLink>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signUpUser })(SignUp));
