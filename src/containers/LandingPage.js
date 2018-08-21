import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    isAuthenticated: state.auth.isAuthenticated,
  }
);

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onSignInClick = this.onSignInClick.bind(this);
  }
  componentDidMount() {
    document.body.style.background = 'url("/img/erging-compressed.jpg") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  }
  componentWillUnmount() {
    document.body.style.background = null;
    document.body.style.backgroundSize = null;
  }
  onSignUpClick() {
    this.props.history.push('/signup');
  }
  onSignInClick() {
    this.props.history.push('/signin');
  }
  render() {
    return (
      <div className="site-welcome">
        <div className="tagline">
          Make your workouts work for you.
        </div>
        <div className='info'>
          QuantiTeam is the leading platform for tracking performance data in team-based endurance sports.
        </div>
        <div className="button-group">
          <button className="sign-up-button" onClick={this.onSignUpClick}>Get Started</button>
        </div>
        <div className="already-user">
          Already a user? <NavLink to="/signin"><strong>Sign in here.</strong></NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(LandingPage));
