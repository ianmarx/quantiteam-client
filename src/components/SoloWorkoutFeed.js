import React from 'react';
import PropTypes from 'prop-types';
import WorkoutPost from './WorkoutPost';
import LoadingScreen from './mini/LoadingScreen';

const SoloWorkoutFeed = (props) => {
  if (props.isFetchingUserWorkouts) {
    return (
      <div className="workout-feed">
        <div className="feed-title">Workouts</div>
        {props.profileUserId === props.currentUserId &&
          <button id="modal-button" onClick={props.onAddWorkoutModalOpen}>Add Workout</button>
        }
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
              onDeleteClick={props.onWorkoutDeleteClick}
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
  isCoach: PropTypes.bool,
  onAddWorkoutModalOpen: PropTypes.func,
  onWorkoutDeleteClick: PropTypes.func,
  soloWorkouts: PropTypes.array,
  userId: PropTypes.string,
  updateWorkout: PropTypes.func,
};

export default SoloWorkoutFeed;
