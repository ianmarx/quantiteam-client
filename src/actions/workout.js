// @flow

import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/workout';

export const FETCH_WORKOUT = 'FETCH_WORKOUT';
export const FETCH_USER_WORKOUTS_SUCCESS = 'FETCH_USER_WORKOUTS_SUCCESS';
export const FETCH_USER_WORKOUTS_FAILURE = 'FETCH_USER_WORKOUTS_FAILURE';
export const FETCH_USER_WORKOUTS_REQUEST = 'FETCH_USER_WORKOUTS_REQUEST';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';
export const FETCH_SOLO_WORKOUTS_SUCCESS = 'FETCH_SOLO_WORKOUTS_SUCCESS';
export const FETCH_SOLO_WORKOUTS_FAILURE = 'FETCH_SOLO_WORKOUTS_FAILURE';
export const FETCH_SOLO_WORKOUTS_REQUEST = 'FETCH_SOLO_WORKOUTS_REQUEST';
export const FETCH_USER = 'FETCH_USER';
export const ADD_WORKOUT = 'ADD_WORKOUT';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';

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
  /* axios POST call */
  return async (dispatch) => {
    /* organize parameters into a single object to pass into POST request */
    await axios.post(`${ROOT_URL}/workouts/add`, workout, headers).then((response) => {
      dispatch({ type: ADD_WORKOUT, payload: response.data });
    }).catch((error) => {
      console.log(`addWorkout() failed: ${error.message}`);
    });
  };
}

export function fetchWorkout(workoutId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    await axios.get(`${ROOT_URL}/workouts/${workoutId}`, headers).then((response) => {
      dispatch({ type: FETCH_WORKOUT, payload: response.data });
    }).catch((error) => {
      console.log(`fetchWorkout failed: ${error.message}`);
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
  /* axios PUT call */
  return async (dispatch) => {
    await axios.put(`${ROOT_URL}/workouts/${workoutId}`, workout, headers).then((response) => {
      dispatch({ type: UPDATE_WORKOUT, payload: response.data });
    }).catch((error) => {
      console.log(`updateWorkout failed: ${error.message}`);
    });
  };
}

export function deleteWorkout(workoutId, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios DELETE call */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/workouts/${workoutId}/${userId}`, headers).then((response) => {
      dispatch({ type: DELETE_WORKOUT, payload: workoutId });
    }).catch((error) => {
      console.log(`deleteWorkout failed: ${error.message}`);
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
