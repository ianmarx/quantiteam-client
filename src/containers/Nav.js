import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { signOutUser } from '../actions/auth';

export const mapStateToProps = state => (
  {
    userId: state.auth.userId,
    isAuthenticated: state.auth.isAuthenticated,
  }
);

export class Nav extends Component {
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
            <NavLink className='nav-button' to={`/profile/${this.props.userId}`}>
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

Nav.propTypes = {
  userId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps, { signOutUser })(Nav));
