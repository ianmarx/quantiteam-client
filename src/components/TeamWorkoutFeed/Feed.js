displayTeamFeed() {
  return (
    <div className="workout-posts">
      {this.props.teamWorkouts.map((workout, i) => {
        return (
          <div key={`workout-${i}`}>
            <TeamWorkoutPost userId={workout._creator}
              teamWorkout={workout}
              index={i}
              onDeleteClick={this.onTeamWorkoutDeleteClick}
              updateTeamWorkout={this.props.updateTeamWorkout}
              onResultAddClick={this.onResultAddClick}
              onViewResultsClick={this.onViewResultsClick}
            />
          </div>
        );
      })}
    </div>
  );
}

{this.props.user.team &&
  <div className="workout-feed">
    <div id="feed-title">Team Workouts</div>
    <button id="team-workout-modal-button" onClick={this.onTeamWorkoutModalOpen}>Add Team Workout</button>
    {this.displayTeamFeed()}
  </div>
}
