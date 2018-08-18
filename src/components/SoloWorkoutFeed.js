import React from 'react';
import WorkoutPost from './WorkoutPost';
import LoadingScreen from './mini/LoadingScreen';

const SoloWorkoutFeed = (props) => {
  if (props.isFetchingUserWorkouts) {
    return (
      <div className="workout-feed">
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

export default SoloWorkoutFeed;
