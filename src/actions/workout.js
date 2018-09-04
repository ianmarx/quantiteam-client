// @flow

import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/workout';

export const FETCH_USER_WORKOUTS_SUCCESS = 'FETCH_USER_WORKOUTS_SUCCESS';
export const FETCH_USER_WORKOUTS_FAILURE = 'FETCH_USER_WORKOUTS_FAILURE';
export const FETCH_USER_WORKOUTS_REQUEST = 'FETCH_USER_WORKOUTS_REQUEST';
export const DELETE_WORKOUT_SUCCESS = 'DELETE_WORKOUT_SUCCESS';
export const DELETE_WORKOUT_FAILURE = 'DELETE_WORKOUT_FAILURE';
export const DELETE_WORKOUT_REQUEST = 'DELETE_WORKOUT_REQUEST';
export const FETCH_SOLO_WORKOUTS_SUCCESS = 'FETCH_SOLO_WORKOUTS_SUCCESS';
export const FETCH_SOLO_WORKOUTS_FAILURE = 'FETCH_SOLO_WORKOUTS_FAILURE';
export const FETCH_SOLO_WORKOUTS_REQUEST = 'FETCH_SOLO_WORKOUTS_REQUEST';
export const ADD_WORKOUT_SUCCESS = 'ADD_WORKOUT_SUCCESS';
export const ADD_WORKOUT_FAILURE = 'ADD_WORKOUT_FAILURE';
export const ADD_WORKOUT_REQUEST = 'ADD_WORKOUT_REQUEST';
export const UPDATE_WORKOUT_SUCCESS = 'UPDATE_WORKOUT_SUCCESS';
export const UPDATE_WORKOUT_FAILURE = 'UPDATE_WORKOUT_FAILURE';
export const UPDATE_WORKOUT_REQUEST = 'UPDATE_WORKOUT_REQUEST';

export function fetchSoloWorkoutsSuccess(soloWorkouts: Array<Object>) : Action {
  return {
    type: FETCH_SOLO_WORKOUTS_SUCCESS,
    soloWorkouts,
  };
}

export function fetchSoloWorkoutsFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_SOLO_WORKOUTS_FAILURE,
    error,
  );
}

export function fetchSoloWorkoutsRequest() : Action {
  return {
    type: FETCH_SOLO_WORKOUTS_REQUEST,
  };
}

export function addWorkoutSuccess(workout: Object) : Action {
  return {
    type: ADD_WORKOUT_SUCCESS,
    workout,
  };
}

export function addWorkoutFailure(error: APIError) : Action {
  return getErrorAction(
    ADD_WORKOUT_FAILURE,
    error,
  );
}

export function addWorkoutRequest() : Action {
  return {
    type: ADD_WORKOUT_REQUEST,
  };
}

export function updateWorkoutSuccess(workout: Object) : Action {
  return {
    type: UPDATE_WORKOUT_SUCCESS,
    workout,
  };
}

export function updateWorkoutFailure(error: APIError) : Action {
  return getErrorAction(
    UPDATE_WORKOUT_FAILURE,
    error,
  );
}

export function updateWorkoutRequest() : Action {
  return {
    type: UPDATE_WORKOUT_REQUEST,
  };
}

export function deleteWorkoutSuccess(workoutId: String) : Action {
  return {
    type: DELETE_WORKOUT_SUCCESS,
    workoutId,
  };
}

export function deleteWorkoutFailure(error: APIError) : Action {
  return getErrorAction(
    DELETE_WORKOUT_FAILURE,
    error,
  );
}

export function deleteWorkoutRequest() : Action {
  return {
    type: DELETE_WORKOUT_REQUEST,
  };
}

export function fetchUserWorkoutsSuccess(userWorkouts: Array<Object>) : Action {
  return {
    type: FETCH_USER_WORKOUTS_SUCCESS,
    userWorkouts,
  };
}

export function fetchUserWorkoutsFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_USER_WORKOUTS_FAILURE,
    error,
  );
}

export function fetchUserWorkoutsRequest() : Action {
  return {
    type: FETCH_USER_WORKOUTS_REQUEST,
  };
}

export function addWorkout(workout) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(addWorkoutRequest());
    await axios.post(`${ROOT_URL}/workouts/add`, workout, headers).then((response) => {
      dispatch(addWorkoutSuccess(response.data));
    }).catch((error) => {
      dispatch(addWorkoutFailure(error));
    });
  };
}

export function fetchUserWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    dispatch(fetchUserWorkoutsRequest());
    await axios.get(`${ROOT_URL}/feed/${userId}`, headers).then((response) => {
      dispatch(fetchUserWorkoutsSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchUserWorkoutsFailure(error));
    });
  };
}

export function updateWorkout(workoutId, workout) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(updateWorkoutRequest());
    await axios.put(`${ROOT_URL}/workouts/${workoutId}`, workout, headers).then((response) => {
      dispatch(updateWorkoutSuccess(response.data));
    }).catch((error) => {
      dispatch(updateWorkoutFailure(error));
    });
  };
}

export function deleteWorkout(workoutId, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(deleteWorkoutRequest());
    await axios.delete(`${ROOT_URL}/workouts/${workoutId}/${userId}`, headers).then((response) => {
      dispatch(deleteWorkoutSuccess(workoutId));
    }).catch((error) => {
      dispatch(deleteWorkoutFailure(error));
    });
  };
}

export function fetchSoloWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch: Function) => {
    dispatch(fetchSoloWorkoutsRequest());
    await axios.get(`${ROOT_URL}/teamfeed/${userId}`, headers).then((response) => {
      dispatch(fetchSoloWorkoutsSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchSoloWorkoutsFailure(error));
    });
  };
}
