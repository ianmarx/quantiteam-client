import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignUpForm = (props) => {
  return (
    <form className='sign-up-form' onSubmit={props.onSubmit}>
      <div className='h0'>Sign Up</div>
      <div className="field">
        <div className='h2-light'>Name</div>
        <input
          className='name'
          onChange={props.onNameChange}
          value={props.name}
          type="text"
          required
          autoComplete='name'
        />
      </div>
      <div className="field">
        <div className='h2-light'>Email</div>
        <input
          className='email'
          onChange={props.onEmailChange}
          value={props.email}
          type="text"
          required
          autoComplete='email'
        />
      </div>
      <div className="field">
        <div className='h2-light'>Password</div>
        <input
          className='password'
          onChange={props.onPasswordChange}
          value={props.password}
          type="password"
          required
          autoComplete='new-password'
        />
      </div>
      <div className='field'>
        <div className='status-text p'>
          {(props.statusText === 'Unauthorized') ? 'The email/password combination was not found.' : props.statusText}
        </div>
        <button type="submit" className='btn-submit'>Sign Up</button>
        <button className='btn-prev' onClick={props.onBackClick}>
          Back
        </button>
      </div>
      <div className="already-user">
        Already on a team? <NavLink to="/signin"><strong>Sign in here.</strong></NavLink>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  onBackClick: PropTypes.func,
  onEmailChange: PropTypes.func,
  onNameChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onSubmit: PropTypes.func,
  password: PropTypes.string,
  statusText: PropTypes.string,
};

export default SignUpForm;
