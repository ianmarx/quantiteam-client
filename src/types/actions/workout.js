// @flow

type fetchSoloWorkoutsSuccess = {
  type: 'FETCH_SOLO_WORKOUTS_SUCCESS',
  userWorkouts: Array<Object>,
}

type fetchSoloWorkoutsFailure = {
  type: 'FETCH_SOLO_WORKOUTS_FAILURE',
  payload: {
    status: string,
    statusText: string,
  };
}

type fetchSoloWorkoutsRequest = {
  type: 'FETCH_SOLO_WORKOUTS_REQUEST',
}

type fetchUserWorkoutsSuccess = {
  type: 'FETCH_USER_WORKOUTS_SUCCESS',
  userWorkouts: Array<Object>,
}

type fetchUserWorkoutsFailure = {
  type: 'FETCH_USER_WORKOUTS_FAILURE',
  payload: {
    status: string,
    statusText: string,
  };
}

type fetchUserWorkoutsRequest = {
  type: 'FETCH_USER_WORKOUTS_REQUEST',
}

type addWorkoutSuccess = {
  type: 'ADD_WORKOUT_SUCCESS',
  workout: Object,
}

type addWorkoutFailure = {
  type: 'ADD_WORKOUT_FAILURE',
  payload: {
    status: String,
    statusText: String,
  }
}

type addWorkoutRequest = {
  type: 'ADD_WORKOUT_REQUEST',
}

type updateWorkoutSuccess = {
  type: 'UPDATE_WORKOUT_SUCCESS',
  workout: Object,
}

type updateWorkoutFailure = {
  type: 'UPDATE_WORKOUT_FAILURE',
  payload: {
    status: String,
    statusText: String,
  }
}

type updateWorkoutRequest = {
  type: 'UPDATE_WORKOUT_REQUEST',
}

type deleteWorkoutSuccess = {
  type: 'DELETE_WORKOUT_SUCCESS',
  workout: Object,
}

type deleteWorkoutFailure = {
  type: 'DELETE_WORKOUT_FAILURE',
  payload: {
    status: String,
    statusText: String,
  }
}

type deleteWorkoutRequest = {
  type: 'DELETE_WORKOUT_REQUEST',
}
export type Action =
  fetchSoloWorkoutsSuccess
  | fetchSoloWorkoutsFailure
  | fetchSoloWorkoutsRequest
  | fetchUserWorkoutsSuccess
  | fetchUserWorkoutsFailure
  | fetchUserWorkoutsRequest
  | addWorkoutSuccess
  | addWorkoutFailure
  | addWorkoutRequest
  | updateWorkoutSuccess
  | updateWorkoutFailure
  | updateWorkoutRequest
  | deleteWorkoutSuccess
  | deleteWorkoutFailure
  | deleteWorkoutRequest;
