import React from 'react';
import PropTypes from 'prop-types';
import WorkoutPost from './WorkoutPost';
import TeamWorkoutPost from './TeamWorkoutPost';
import LoadingScreen from './mini/LoadingScreen';

const WorkoutFeed = (props) => {
  if (props.isFetchingSoloWorkouts || props.isFetchingTeamWorkouts) {
    return (
      <div className="workout-feed loading">
        <div className='h1 ctr'>{props.teamName}</div>
        <LoadingScreen />
      </div>
    );
  } else {
    const unsortedWorkouts = props.soloWorkouts.concat(props.teamWorkouts);
    const workoutList = unsortedWorkouts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return (
      <div className="workout-feed">
        <div className='h1 ctr'>{props.teamName}</div>
        {props.isCoach ? (
          <button id="modal-button" onClick={props.onAddTeamWorkoutModalOpen}>Add Team Workout</button>
        ) : (
          <button id="modal-button" onClick={props.onAddWorkoutModalOpen}>Add Workout</button>
        )
        }
        {workoutList.map((workout) => {
          if (workout.creatorName) {
              return (
                <WorkoutPost
                  workout={workout}
                  key={workout.date}
                  deleteWorkout={props.deleteWorkout}
                  updateWorkout={props.updateWorkout}
                  currentUserId={props.currentUserId}
                />
              );
            } else {
              return (
                <TeamWorkoutPost
                  teamWorkout={workout}
                  key={workout.date}
                  isCoach={props.isCoach}
                  deleteTeamWorkout={props.deleteTeamWorkout}
                  updateTeamWorkout={props.updateTeamWorkout}
                  onAddResultClick={props.onAddResultClick}
                  onViewResultsClick={props.onViewResultsClick}
                />
              );
            }
          })}
      </div>
    );
  }
};

WorkoutFeed.propTypes = {
  currentUserId: PropTypes.string,
  isCoach: PropTypes.bool,
  isFetchingSoloWorkouts: PropTypes.bool,
  isFetchingTeamWorkouts: PropTypes.bool,
  onAddResultClick: PropTypes.func,
  onAddWorkoutModalOpen: PropTypes.func,
  onAddWorkoutModalClose: PropTypes.func,
  onViewResultsClick: PropTypes.func,
  soloWorkouts: PropTypes.array,
  teamName: PropTypes.string,
  teamWorkouts: PropTypes.array,
  updateResult: PropTypes.func,
  updateTeamWorkout: PropTypes.func,
  updateWorkout: PropTypes.func,
};

export default WorkoutFeed;
