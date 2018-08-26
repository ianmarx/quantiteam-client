import React from 'react';
import WorkoutPost from './WorkoutPost';
import TeamWorkoutPost from './TeamWorkoutPost';
import LoadingScreen from './mini/LoadingScreen';

const WorkoutFeed = (props) => {
  if (props.isFetchingSoloWorkouts || props.isFetchingTeamWorkouts) {
    return (
      <div className="workout-feed">
        <div className="feed-title">Workout Feed</div>
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
        <div className="feed-title">Workout Feed</div>
        {props.isCoach ? (
          <button id="team-workout-modal-button" onClick={props.onAddTeamWorkoutModalOpen}>Add Team Workout</button>
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
                  isCoach={props.isCoach}
                  onDeleteClick={props.onWorkoutDeleteClick}
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
                  onDeleteClick={props.onTeamWorkoutDeleteClick}
                  updateTeamWorkout={props.updateTeamWorkout}
                  onResultAddClick={props.onAddResultClick}
                  onViewResultsClick={props.onViewResultsClick}
                />
              );
            }
          })}
      </div>
    );
  }
};

export default WorkoutFeed;
