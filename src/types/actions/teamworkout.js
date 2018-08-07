// @flow

type fetchTeamWorkoutSuccess = {
  type: 'FETCH_TEAM_WORKOUT_SUCCESS',
  teamWorkout: Object,
}

type fetchTeamWorkoutFailure = {
  type: 'FETCH_TEAM_WORKOUT_FAILURE',
  payload: {
    status: string,
    statusText: string,
  };
}

type fetchTeamWorkoutRequest = {
  type: 'FETCH_TEAM_WORKOUT_REQUEST',
}

type fetchTeamWorkoutResultsSuccess = {
  type: 'FETCH_TEAM_WORKOUT_RESULTS_SUCCESS',
  teamWorkoutResults: Array<Object>,
}

type fetchTeamWorkoutResultsFailure = {
  type: 'FETCH_TEAM_WORKOUT_RESULTS_FAILURE',
  payload: {
    status: string,
    statusText: string,
  };
}

type fetchTeamWorkoutResultsRequest = {
  type: 'FETCH_TEAM_WORKOUT_RESULTS_REQUEST',
}

export type Action =
  fetchTeamWorkoutSuccess
  | fetchTeamWorkoutFailure
  | fetchTeamWorkoutRequest
  | fetchTeamWorkoutResultsSuccess
  | fetchTeamWorkoutResultsFailure
  | fetchTeamWorkoutResultsRequest;
