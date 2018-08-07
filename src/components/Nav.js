import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signOutUser } from '../actions/auth';
import { fetchUser } from '../actions/user';
import { fetchUserWorkouts } from '../actions/workout';

/* Connect to the auth prop */
const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

/* Navbar component */
class Nav extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
  }

  onProfileClick() {
    this.props.fetchUser(localStorage.getItem('userId'));
    this.props.fetchUserWorkouts(localStorage.getItem('userId'));
  }

  signOut() {
    this.props.signOutUser(this.props.history);
  }

  render() {
    return (
      <nav>
        {this.props.authenticated ? (
          <ul className="navigation">
            <li>
              <div id="name-logo">Quantiteam<sup>Beta</sup></div>
            </li>
            <li>
              <NavLink to={`/home/${localStorage.getItem('userId')}`}>
                <div id="home-button" className='nav-button'>Home</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/profile/${localStorage.getItem('userId')}`}>
                <div id="profile-button" onClick={this.onProfileClick} className="nav-button">Profile</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/team/${localStorage.getItem('userId')}`}>
                <div id="profile-button" className="nav-button">Team</div>
              </NavLink>
            </li>
            <li>
              <div id="signout-button" onClick={this.signOut} className="nav-button">
                Sign Out
              </div>
            </li>
          </ul>
        ) : (
          <ul className="navigation">
            <li>
              <div id="name-logo">Quantiteam<sup>Beta</sup></div>
            </li>
            <li>
              <NavLink to="/">
                <div id="home-button-deauth" className='nav-button'>Home</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <div id="signup-button" className="nav-button">Sign Up</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin">
                <div id="signin-button" className="nav-button">Sign In</div>
              </NavLink>
            </li>
          </ul>
        )
        }
      </nav>
    );
  }
}

export default withRouter(connect(mapStateToProps, { signOutUser, fetchUser, fetchUserWorkouts })(Nav));
