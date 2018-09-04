import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

export const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    isAuthenticated: state.auth.isAuthenticated,
  }
);

export class LandingPage extends Component {
  componentDidMount() {
    document.body.style.background = 'url("/img/erging-compressed.jpg") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  }
  componentWillUnmount() {
    document.body.style.background = null;
    document.body.style.backgroundSize = null;
  }
  render() {
    return (
      <div className="site-welcome">
        <div className='header'>
          Your workouts, all in one place.
        </div>
        <div className='info'>
          <div>
            Record your in-season team performance and off-season training with <strong>QuantiTeam.</strong>
          </div>
          <div className='tagline'>
            No spreadsheets required.
          </div>
        </div>
        <NavLink className='sign-up-button' to='/signup'>Get Started</NavLink>
        <div className="already-user">
          Already a user? <NavLink to="/signin"><strong>Sign in here.</strong></NavLink>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  userId: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, null)(LandingPage));
