import React from 'react';
import PropTypes from 'prop-types';

const TeamInfo = (props) => {
  return (
    <div className="team-info">
      <div className='h1 ctr'>{props.team.name}</div>
      <div className='team-details'>
        {props.isCoach &&
          <div className='team-code'>
            <div className='p-extra-sm'>Team Code</div>
            <div className='h3'>{props.team.teamCode}</div>
          </div>
        }
        <button type='button' className='view-roster-button' onClick={props.onViewRosterClick}>View Roster</button>
      </div>
    </div>
  );
};

TeamInfo.propTypes = {
  isCoach: PropTypes.bool,
  onViewRosterClick: PropTypes.func,
  team: PropTypes.object,
};

export default TeamInfo;
