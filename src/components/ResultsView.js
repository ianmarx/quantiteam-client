import React from 'react';
import PropTypes from 'prop-types';
import ResultPost from './ResultPost';

const ResultsView = (props) => {
  const date = props.teamWorkout.date;
  const dateObject = new Date(date);
  const dateString = dateObject.toDateString();

  return (
    <div className="results-view-container">
      <div className='results-view'>
        {dateString}
        {props.teamWorkout.type === 'distance' &&
          <div className="results-title distance">
            {props.teamWorkout.distance} {props.teamWorkout.distUnit} {props.teamWorkout.activity}
          </div>
        }
        {props.teamWorkout.type === 'time' &&
          <div className="results-title time">
            {props.teamWorkout.timeString} {props.teamWorkout.activity}
          </div>
        }
        <div className='result-feed'>
          {props.results.map((workout) => {
            return (
              <ResultPost
                isCoach={props.isCoach}
                workout={workout}
                key={workout.date}
                teamWorkoutId={props.teamWorkout._id}
                type={props.teamWorkout.type}
                updateResult={props.updateResult}
                deleteResult={props.deleteResult}
              />
            );
          })}
        </div>
        {props.results.length === 0 &&
          <div className='instructions'>No results have been logged for this team workout.</div>
        }
      </div>
      <button type="button" className="modal-close" onClick={props.onModalClose}>Close</button>
    </div>
  );
};

ResultsView.propTypes = {
  deleteResult: PropTypes.func,
  isCoach: PropTypes.bool,
  onModalClose: PropTypes.func,
  results: PropTypes.array,
  teamWorkout: PropTypes.object,
  updateResult: PropTypes.func,
};

export default ResultsView;
