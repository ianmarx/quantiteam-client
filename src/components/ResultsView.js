import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultPost from './ResultPost';

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.state = { inEditMode: false };

    this.onEditModeClick = this.onEditModeClick.bind(this);
    this.onViewModeClick = this.onViewModeClick.bind(this);
  }

  onEditModeClick() {
    this.setState({ inEditMode: true });
  }

  onViewModeClick() {
    this.setState({ inEditMode: false });
  }

  render() {
    const date = this.props.teamWorkout.date;
    const dateObject = new Date(date);
    const dateString = dateObject.toDateString();

    return (
      <div className='results-view'>
        <div className='p-sm date'>{dateString}</div>
        {this.props.teamWorkout.type === 'distance' &&
          <div className="h1">
            {this.props.teamWorkout.distance} {this.props.teamWorkout.distUnit} {this.props.teamWorkout.activity}
          </div>
        }
        {this.props.teamWorkout.type === 'time' &&
          <div className="h1">
            {this.props.teamWorkout.timeString} {this.props.teamWorkout.activity}
          </div>
        }
        {this.props.results.length !== 0 && this.props.isCoach &&
          <React.Fragment>
            {this.state.inEditMode ? (
              <React.Fragment>
                <button id='viewModeButton' className='p-extra-sm btn-hollow-1' onClick={this.onViewModeClick}>View Mode</button>
                <div id='editInstructions'>Click directly on a result to edit data.</div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button id='editModeButton' className='p-extra-sm btn-hollow-1' onClick={this.onEditModeClick}>Edit Mode</button>
                <div id='editInstructions'>Click <strong>Edit Mode</strong> to edit/delete results.</div>
              </React.Fragment>
            )
            }
          </React.Fragment>
        }
        {this.props.results.length !== 0 &&
          <React.Fragment>
            <div className='line' />
            <div className='column-titles p-extra-sm'>
              <div className='row-unit'>Athlete</div>
              {this.props.teamWorkout.type === 'time' &&
                <div className='row-unit'>Distance</div>
              }
              {this.props.teamWorkout.type === 'distance' &&
                <div className='row-unit'>Time</div>
              }
              {this.props.teamWorkout.activity === 'erg' &&
                <div className='row-unit'>s/500m</div>
              }
              {(this.props.teamWorkout.activity === 'erg' || this.props.teamWorkout.activity === 'row') &&
                <div className='row-unit'>s/m</div>
              }
              {this.props.teamWorkout.activity === 'bike' &&
                <div className='row-unit'>Watts</div>
              }
              <div className='row-unit'>bpm</div>
            </div>
          </React.Fragment>
        }
        <div className='result-feed'>
          {this.props.results.map((workout) => {
            return (
              <ResultPost
                inEditMode={this.state.inEditMode}
                isCoach={this.props.isCoach}
                workout={workout}
                key={workout.date}
                teamWorkoutId={this.props.teamWorkout._id}
                type={this.props.teamWorkout.type}
                updateResult={this.props.updateResult}
                deleteResult={this.props.deleteResult}
              />
            );
          })}
        </div>
        {this.props.results.length === 0 &&
          <div className='instructions'>No results have been logged for this team workout. {this.props.isCoach && 'Exit and click <strong>Add Result</strong> to record team workout results.'}</div>
        }
        <button type="button" className="modal-close" onClick={this.props.onModalClose}>Close</button>
      </div>
    );
  }
}

ResultsView.propTypes = {
  deleteResult: PropTypes.func,
  isCoach: PropTypes.bool,
  onModalClose: PropTypes.func,
  results: PropTypes.array,
  teamWorkout: PropTypes.object,
  updateResult: PropTypes.func,
};

export default ResultsView;
