import React from 'react';
import PropTypes from 'prop-types';
import WorkoutPost from '../containers/WorkoutPost';

const SoloWorkoutFeed = (props) => {
  const workoutList = props.soloWorkouts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="workout-feed">
      <div className="feed-title">Workouts</div>
      <button id="modal-button" onClick={props.onAddWorkoutModalOpen}>Add Workout</button>
      {workoutList.map((workout) => {
        return (
          <WorkoutPost
            userId={workout._creator}
            workout={workout}
            key={workout.date}
            isCoach={props.isCoach}
            onDeleteClick={props.onWorkoutDeleteClick}
            updateWorkout={props.updateWorkout}
            currentUserId={props.userId}
          />
        );
        })}
    </div>
  );
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
