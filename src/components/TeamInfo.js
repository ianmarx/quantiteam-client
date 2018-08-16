import React, { Component } from 'react';

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
        <div className='team-name'>
          {this.props.team.name}
        </div>
        <div className='team-details'>
          {this.props.isCoach &&
            <div className='team-code'>
              Team Code: <strong>{this.props.team.teamCode}</strong>
            </div>
          }
          <button type='button' className='view-roster-button' onClick={this.props.onViewRosterClick}>View Roster</button>
        </div>
      </div>
    );
  }
}

export default TeamInfo;
