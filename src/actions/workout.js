import axios from 'axios';
import ROOT_URL from './index';

export const FETCH_WORKOUT = 'FETCH_WORKOUT';
export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';
export const FETCH_TEAM_SOLO_WORKOUTS = 'FETCH_TEAM_SOLO_WORKOUTS';
export const FETCH_USER = 'FETCH_USER';
export const ADD_WORKOUT = 'ADD_WORKOUT';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';

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
    await axios.get(`${ROOT_URL}/feed/${userId}`, headers).then((response) => {
      dispatch({ type: FETCH_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`fetchUserWorkouts failed: ${error.message}`);
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

export function fetchTeamSoloWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/teamfeed/${userId}`, headers).then((response) => {
      dispatch({ type: FETCH_TEAM_SOLO_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`fetchTeamSoloWorkouts failed: ${error.message}`);
    });
  };
}
