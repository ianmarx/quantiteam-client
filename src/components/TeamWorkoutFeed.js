import React from 'react';
import PropTypes from 'prop-types';
import TeamWorkoutPost from '../containers/TeamWorkoutPost';

const TeamWorkoutFeed = (props) => {
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
        })}
    </div>
  );
};

TeamWorkoutFeed.propTypes = {
  isCoach: PropTypes.bool,
  onAddTeamWorkoutModalOpen: PropTypes.func,
  onAddResultClick: PropTypes.func,
  onViewResultsClick: PropTypes.func,
  onWorkoutDeleteClick: PropTypes.func,
  onTeamWorkoutDeleteClick: PropTypes.func,
  teamWorkouts: PropTypes.array,
  userId: PropTypes.string,
  updateWorkout: PropTypes.func,
  updateTeamWorkout: PropTypes.func,
};

export default TeamWorkoutFeed;
