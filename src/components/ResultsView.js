import React from 'react';
import ResultPost from '../containers/result-post';

const ResultsView = (props) => {
  return (
    <div className="results-container">
      <div className="results-view">
        <div className="results-title">
          Workout Results
        </div>
        <div className="results-feed">
          {props.results.map((workout, i) => {
            return (
              <div key={`workout-${i}`}>
                <ResultPost
                  workout={workout}
                  index={i}
                  teamWorkoutId={props.teamWorkoutId}
                  type={props.type}
                  onDeleteClick={props.onDeleteClick}
                  updateWorkout={props.updateWorkout}
                  deleteResult={props.deleteResult}
                  fetchDistResults={props.fetchDistResults}
                  fetchTimeResults={props.fetchTimeResults}
                />
              </div>
            );
          })}
        </div>
        <button type="button" className="modal-close" onClick={props.onModalClose}>Close</button>
      </div>
    </div>
  );
};

export default ResultsView;
