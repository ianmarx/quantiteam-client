displayFeed() {
  if (!this.props.team._id) {
    return (
      <div className="workout-posts">
        {this.props.workouts.map((workout, i) => {
          return (
            <div key={`workout-${i}`}>
              <WorkoutPost userId={workout._creator}
                workout={workout}
                index={i}
                onDeleteClick={this.onDeleteClick}
                updateWorkout={this.props.updateWorkout}
                currentUserId={this.props.match.params.userId}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="workout-posts">
        {this.props.teamSoloWorkouts.map((workout, i) => {
          return (
            <div key={`workout-${i}`}>
              <WorkoutPost userId={workout._creator}
                workout={workout}
                index={i}
                onDeleteClick={this.onDeleteClick}
                updateWorkout={this.props.updateWorkout}
                currentUserId={this.props.match.params.userId}
              />
            </div>
          );
        })}
      </div>
    );
  }
}


<div className="workout-feed">
  <div id="feed-title">Solo Workouts</div>
  <div className="button-group">
    <button id="modal-button" onClick={this.onModalOpen}>Add Workout</button>
    {!this.props.user.team &&
      <button id="create-modal-button" onClick={this.onTeamModalOpen}>Create Team</button>
    }
    {!this.props.user.team &&
      <button id="join-modal-button" onClick={this.onJoinModalOpen}>Join Team</button>
    }
  </div>
  {this.displayFeed()}
</div>

<ReactModal
  isOpen={this.state.showModal}
  contentLabel="Add Workout"
  className="modal"
  overlayClassName="overlay"
>
  <AddWorkoutForm
    addWorkout={this.props.addWorkout}
    userId={this.props.match.params.userId}
    onModalClose={this.onModalClose}
  />
</ReactModal>

async onDeleteClick(workoutId, userId) {
  await this.props.deleteWorkout(workoutId, userId);
  this.props.fetchUser(this.props.match.params.userId);
  this.props.fetchUserWorkouts(this.props.match.params.userId);
  if (this.props.team._id) {
    this.props.fetchTeamSoloWorkouts(this.props.match.params.userId);
  }
}
