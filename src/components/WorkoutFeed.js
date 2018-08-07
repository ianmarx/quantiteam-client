import React from 'react';
import PropTypes from 'prop-types';
import WorkoutPost from '../containers/WorkoutPost';
import TeamWorkoutPost from '../containers/TeamWorkoutPost';

const WorkoutFeed = (props) => {
  const unsortedWorkouts = props.soloWorkouts.concat(props.teamWorkouts);
  const workoutList = unsortedWorkouts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="workout-feed">
      <div className="feed-title">{props.teamName}</div>
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
                userId={workout._creator}
                workout={workout}
                key={workout.date}
                isCoach={props.isCoach}
                onDeleteClick={props.onWorkoutDeleteClick}
                updateWorkout={props.updateWorkout}
                currentUserId={props.userId}
              />
            );
          } else {
            return (
              <TeamWorkoutPost
                userId={workout._creator}
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
};

WorkoutFeed.propTypes = {
  isCoach: PropTypes.bool,
  onAddWorkoutModalOpen: PropTypes.func,
  onAddTeamWorkoutModalOpen: PropTypes.func,
  onAddResultClick: PropTypes.func,
  onViewResultsClick: PropTypes.func,
  onWorkoutDeleteClick: PropTypes.func,
  onTeamWorkoutDeleteClick: PropTypes.func,
  soloWorkouts: PropTypes.array,
  teamWorkouts: PropTypes.array,
  teamName: PropTypes.string,
  userId: PropTypes.string,
  updateWorkout: PropTypes.func,
  updateTeamWorkout: PropTypes.func,
};

export default WorkoutFeed;
