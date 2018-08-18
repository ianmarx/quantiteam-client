import React from 'react';
import TeamWorkoutPost from './TeamWorkoutPost';
import LoadingScreen from './mini/LoadingScreen';

const TeamWorkoutFeed = (props) => {
  if (props.isFetchingTeamWorkouts) {
    return (
      <div className="workout-feed">
        <div className="feed-title">Team Workouts</div>
        <LoadingScreen />
      </div>
    );
  } else {
    const workoutList = props.teamWorkouts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return (
      <div className="workout-feed">
        <div className="feed-title">Team Workouts</div>
        {props.isCoach &&
          <button id="team-workout-modal-button" onClick={props.onAddTeamWorkoutModalOpen}>Add Team Workout</button>
        }
        {workoutList.map((workout) => {
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
          })}
      </div>
    );
  }
};

export default TeamWorkoutFeed;
