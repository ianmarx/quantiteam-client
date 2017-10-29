import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class TeamInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      teamName: '',
    };
  }
  render() {
    return (
      <div className="team-info">
        <div id="teamName">
          {this.props.team.name}
        </div>
        {this.props.team.athletes &&
          <div className="team-leaderboard">
            <strong>Roster</strong>
            {this.props.team.athletes.map((athlete, i) => {
              return (
                <div key={`athlete-${i}`}>
                  <NavLink to={`/profile/${athlete._id}`}>
                    <div className="profile-link">{athlete.name}</div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}

export default TeamInfo;
