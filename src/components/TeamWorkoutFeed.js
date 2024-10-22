import React from 'react';
import PropTypes from 'prop-types';
import TeamWorkoutPost from './TeamWorkoutPost';
import LoadingScreen from './mini/LoadingScreen';

const TeamWorkoutFeed = (props) => {
  if (props.isFetchingTeamWorkouts) {
    return (
      <div className="workout-feed loading">
        <LoadingScreen />
      </div>
    );
  } else {
    const workoutList = props.teamWorkouts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return (
      <div className="workout-feed">
        {props.isCoach &&
          <button id="modal-button" onClick={props.onAddTeamWorkoutModalOpen}>Add Team Workout</button>
        }
        {workoutList.map((workout) => {
          return (
            <TeamWorkoutPost
              teamWorkout={workout}
              key={workout.date}
              isCoach={props.isCoach}
              fetchTeamWorkout={props.fetchTeamWorkout}
              deleteTeamWorkout={props.deleteTeamWorkout}
              updateTeamWorkout={props.updateTeamWorkout}
              onAddResultClick={props.onAddResultClick}
              onViewResultsClick={props.onViewResultsClick}
            />
          );
          })}
      </div>
    );
  }
};

TeamWorkoutFeed.propTypes = {
  deleteTeamWorkout: PropTypes.func,
  isFetchingTeamWorkouts: PropTypes.bool,
  isCoach: PropTypes.bool,
  onAddResultClick: PropTypes.func,
  onViewResultsClick: PropTypes.func,
  onAddTeamWorkoutModalOpen: PropTypes.func,
  teamWorkouts: PropTypes.array,
  updateTeamWorkout: PropTypes.func,
};

export default TeamWorkoutFeed;
