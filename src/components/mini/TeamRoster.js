import React from 'react';
import { NavLink } from 'react-router-dom';

const TeamRoster = (props) => {
  return (
    <div className='team-roster-modal-container'>
      <div className='team-roster'>
        <div className='athlete-list'>
          <div className='h2'>Athletes</div>
          {!props.athletes ? (
            <div className='not-found'>No athletes found.</div>
          ) : (
            <div>
              {props.athletes.map((athlete, i) => {
                return (
                  <div className='athlete' key={`athlete-${i}`}>
                    <NavLink to={`/profile/${athlete._id}`}>
                      <div className="p profile-link">{athlete.name}</div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className='coach-list'>
          <div className='h2'>Coaches</div>
          {!props.coaches ? (
            <div className='not-found'>No coaches found.</div>
          ) : (
            <div>
              {props.coaches.map((coach, i) => {
                return (
                  <div className='coach' key={`coach-${i}`}>
                    <NavLink to={`/profile/${coach._id}`}>
                      <div className="p profile-link">{coach.name}</div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          )}
          <br />
          <button type='button' className='modal-close' onClick={props.onCloseRosterClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TeamRoster;
