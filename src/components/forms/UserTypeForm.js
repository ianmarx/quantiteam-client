import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserTypeForm = (props) => {
  return (
    <div className='user-type-form'>
      <div className='h0'>Sign Up</div>
      <div className='h2-light'>as an</div>
      <div className='button-group'>
        <button
          id='btn-athlete'
          className={`btn-role-select ${props.userType !== 'athlete' && 'disabled'}`}
          type='button'
          onClick={props.onAthleteSelect}
        >
          Athlete
        </button>
        <div className='h2-light'>or</div>
        <button
          id='btn-coach'
          className={`btn-role-select ${props.userType !== 'coach' && 'disabled'}`}
          type='button'
          onClick={props.onCoachSelect}
        >
          Coach
        </button>
      </div>
      {props.userType === 'athlete' &&
        <div className="field">
          <div className='h2-light'>Enter the team code provided by your coach.</div>
          <input
            id='team-code'
            className={`${props.teamCodeIsValid && props.teamCode !== '' && 'valid'}`}
            onChange={props.onTeamCodeChange}
            value={props.teamCode}
            type="text"
            required
            placeholder='Team Code'
            autoFocus
            spellCheck={false}
          />
        </div>
      }
      {props.userType === 'coach' &&
        <div className="field">
          <div className='h2-light'>Enter your desired team name to check availability.</div>
          <input
            id='team-name'
            className={`${props.teamNameIsAvailable && props.teamName !== '' && 'valid'}`}
            onChange={props.onTeamNameChange}
            value={props.teamName}
            type="text"
            required
            placeholder='Team Name'
            autoFocus
            spellCheck={false}
          />
        </div>
      }
      <button
        className='btn-submit'
        disabled={props.disableNextButton}
        onClick={props.onNextClick}
      >
        Continue
      </button>
      <NavLink to="/">
        <button className='btn-prev'>Back</button>
      </NavLink>
      <div className="already-user">
        Already on a team? <NavLink to="/signin"><strong>Sign in here.</strong></NavLink>
      </div>
    </div>
  );
};

UserTypeForm.propTypes = {
  disableNextButton: PropTypes.bool,
  onAthleteSelect: PropTypes.func,
  onCoachSelect: PropTypes.func,
  onNextClick: PropTypes.func,
  onTeamCodeChange: PropTypes.func,
  onTeamNameChange: PropTypes.func,
  teamCode: PropTypes.string,
  teamCodeIsValid: PropTypes.bool,
  teamName: PropTypes.string,
  teamNameIsAvailable: PropTypes.bool,
  userType: PropTypes.string,
};

export default UserTypeForm;
