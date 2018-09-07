import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { signOutUser, resetAuth } from '../actions/auth';

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
            <div className='btn-group'>
              <NavLink className='nav-button' exact to='/'>
                Home
              </NavLink>
              <NavLink className='nav-button' to='/team'>
                Team
              </NavLink>
              <NavLink className='nav-button' to={`/profile/${this.props.userId}`}>
                Profile
              </NavLink>
              <div onClick={this.onSignOutClick} className="nav-button sign-out">
                Sign Out
              </div>
            </div>
          </div>
        ) : (
          <div className='nav-list'>
            <div className='logo'>QuantiTeam<sup>Beta</sup></div>
            <div className='btn-group'>
              <NavLink exact className='nav-button' to="/" onClick={this.props.resetAuth}>
                Home
              </NavLink>
              <NavLink className='nav-button' to="/signup" onClick={this.props.resetAuth}>
                Sign Up
              </NavLink>
              <NavLink className='nav-button' to="/signin" onClick={this.props.resetAuth}>
                Sign In
              </NavLink>
            </div>
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

export default withRouter(connect(mapStateToProps, { signOutUser, resetAuth })(Nav));
