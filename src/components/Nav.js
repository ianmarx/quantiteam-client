import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signOutUser } from '../actions/auth';

const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.isAuthenticated,
  }
);

/* Navbar component */
class Nav extends Component {
  constructor(props) {
    super(props);

    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick() {
    this.props.signOutUser(this.props.history);
  }

  render() {
    return (
      <nav>
        {this.props.isAuthenticated ? (
          <div className="nav-list">
            <div className='logo'>QuantiTeam<sup>Beta</sup></div>
            <NavLink className='nav-button' exact to='/'>
              Home
            </NavLink>
            <NavLink className='nav-button' to={`/profile/${localStorage.getItem('userId')}`}>
              Profile
            </NavLink>
            <NavLink className='nav-button' to='/team'>
              Team
            </NavLink>
            <div onClick={this.onSignOutClick} className="nav-button sign-out">
              Sign Out
            </div>
          </div>
        ) : (
          <div className='nav-list'>
            <div className='logo'>QuantiTeam<sup>Beta</sup></div>
            <NavLink exact className='nav-button' to="/">
              Home
            </NavLink>
            <NavLink className='nav-button' to="/signup">
              Sign Up
            </NavLink>
            <NavLink className='nav-button' to="/signin">
              Sign In
            </NavLink>
          </div>
        )
        }
      </nav>
    );
  }
}

export default withRouter(connect(mapStateToProps, { signOutUser })(Nav));
