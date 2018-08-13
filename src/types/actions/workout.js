// @flow

type fetchSoloWorkoutsSuccess = {
  type: 'FETCH_SOLO_WORKOUTS_SUCCESS',
  soloWorkouts: Array<Object>,
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

export type Action =
  fetchSoloWorkoutsSuccess
  | fetchSoloWorkoutsFailure
  | fetchSoloWorkoutsRequest;
