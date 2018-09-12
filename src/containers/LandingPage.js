import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import PageFooter from '../components/mini/PageFooter';

export const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    isAuthenticated: state.auth.isAuthenticated,
  }
);

export const LandingPage = (props) => {
  window.scrollTo(0, 0);
  return (
    <div className='landing-page-container'>
      <div className='info-box top'>
        <div className='col'>
          <div className='header'>
            Your workouts, all in one place.
          </div>
          <div className='tagline'>
            Record your team workouts and solo training with QuantiTeam. No spreadsheets required.
          </div>
          <NavLink className='cta-button' to='/signup'>GET STARTED</NavLink>
          <div className="already-user">
            Already on a team? <NavLink to="/signin"><strong>Sign in here.</strong></NavLink>
          </div>
        </div>
      </div>
      {/*
      <img id='erg-image' src='/img/erg-crop-md-compressed.jpeg' alt='' />
      */}
      <div className='line' />
      <div className='info-box no-image'>
        <div className='col'>
          <div className='h1'>The solution to workout logging for endurance sports</div>
        </div>
      </div>
      <div className='info-box'>
        <div className='col even'>
          <i className="fas fa-heartbeat" />
          <div className='h2'>Solo Training</div>
          <div className='p'>
            Log your personal workouts and keep up with your teammates in the off-season.
          </div>
        </div>
        <div className='col even'>
          <i className="fas fa-users" />
          <div className='h2'>Team Performance</div>
          <div className='p'>
            Set up team workouts, record individual results, and view the ranked leaderboard.
          </div>
        </div>
        <div className='col even'>
          <i className="fas fa-mobile-alt" />
          <div className='h2'>Mobile-ready</div>
          <div className='p'>
            Record and modify your workouts anytime, anywhere.
          </div>
        </div>
      </div>
      <div className='line' />
      <div className='info-box'>
        <div className='col even'>
          <div className='h2'>Try QuantiTeam for free</div>
          <NavLink className='cta-button end' to='/signup'>GET STARTED</NavLink>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  userId: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, null)(LandingPage));
