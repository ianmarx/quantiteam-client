import React from 'react';
import PropTypes from 'prop-types';
import WorkoutPost from './WorkoutPost';
import LoadingScreen from './mini/LoadingScreen';

const SoloWorkoutFeed = (props) => {
  if (props.isFetchingUserWorkouts) {
    return (
      <div className="workout-feed loading">
        <div className="feed-title">Workouts</div>
        <LoadingScreen />
      </div>
    );
  } else {
    const workoutList = props.soloWorkouts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return (
      <div className="workout-feed">
        <div className="feed-title">Workouts</div>
        {props.profileUserId === props.currentUserId &&
          <button id="modal-button" onClick={props.onAddWorkoutModalOpen}>Add Workout</button>
        }
        {workoutList.map((workout) => {
          return (
            <WorkoutPost
              workout={workout}
              key={workout.date}
              isCoach={props.isCoach}
              deleteWorkout={props.deleteWorkout}
              updateWorkout={props.updateWorkout}
              currentUserId={props.currentUserId}
            />
          );
          })}
      </div>
    );
  }
};

SoloWorkoutFeed.propTypes = {
  currentUserId: PropTypes.string,
  deleteWorkout: PropTypes.func,
  isCoach: PropTypes.bool,
  isFetchingUserWorkouts: PropTypes.bool,
  onAddWorkoutModalOpen: PropTypes.func,
  profileUserId: PropTypes.string,
  soloWorkouts: PropTypes.array,
  updateWorkout: PropTypes.func,
};

export default SoloWorkoutFeed;
