// @flow

import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/teamworkout';

export const FETCH_TEAM_WORKOUT_SUCCESS = 'FETCH_TEAM_WORKOUT_SUCCESS';
export const FETCH_TEAM_WORKOUT_FAILURE = 'FETCH_TEAM_WORKOUT_FAILURE';
export const FETCH_TEAM_WORKOUT_REQUEST = 'FETCH_TEAM_WORKOUT_REQUEST';
export const FETCH_TEAM_WORKOUT_RESULTS_SUCCESS = 'FETCH_TEAM_WORKOUT_RESULTS_SUCCESS';
export const FETCH_TEAM_WORKOUT_RESULTS_FAILURE = 'FETCH_TEAM_WORKOUT_RESULTS_FAILURE';
export const FETCH_TEAM_WORKOUT_RESULTS_REQUEST = 'FETCH_TEAM_WORKOUT_RESULTS_REQUEST';
export const FETCH_TEAM_WORKOUTS = 'FETCH_TEAM_WORKOUTS';
export const FETCH_TEAM_WORKOUT = 'FETCH_TEAM_WORKOUT';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const MATCH_ATHLETE = 'MATCH_ATHLETE';
export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';
export const DELETE_TEAM_WORKOUT = 'DELETE_TEAM_WORKOUT';
export const DELETE_RESULT = 'DELETE_RESULT';

export function fetchTeamWorkoutSuccess(teamWorkout: Object) : Action {
  return {
    type: FETCH_TEAM_WORKOUT_SUCCESS,
    teamWorkout,
  };
}

export function fetchTeamWorkoutFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_TEAM_WORKOUT_FAILURE,
    error,
  );
}

export function fetchTeamWorkoutRequest() : Action {
  return {
    type: FETCH_TEAM_WORKOUT_REQUEST,
  };
}

export function fetchTeamWorkoutResultsSuccess(teamWorkoutResults: Array<Object>) : Action {
  return {
    type: FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
    teamWorkoutResults,
  };
}

export function fetchTeamWorkoutResultsFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
    error,
  );
}

export function fetchTeamWorkoutResultsRequest() : Action {
  return {
    type: FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
  };
}

export function fetchTeamWorkout(teamWorkoutId) : Function {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch: Function) => {
    dispatch(fetchTeamWorkoutRequest());
    await axios.get(`${ROOT_URL}/teamworkout/${teamWorkoutId}`, headers).then((response) => {
      dispatch(fetchTeamWorkoutSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchTeamWorkoutFailure(error));
    });
  };
}

export function fetchDistResults(teamWorkoutId) : Function {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch: Function) => {
    await axios.get(`${ROOT_URL}/results/dist/${teamWorkoutId}`, headers).then((response) => {
      dispatch(fetchTeamWorkoutResultsSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchTeamWorkoutResultsFailure(error));
    });
  };
}

export function fetchTimeResults(teamWorkoutId) : Function {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch: Function) => {
    await axios.get(`${ROOT_URL}/results/time/${teamWorkoutId}`, headers).then((response) => {
      dispatch(fetchTeamWorkoutResultsSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchTeamWorkoutResultsFailure(error));
    });
  };
}

export function addTeamWorkout({ teamId, activity, distance, distUnit, time, type }, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  const info = { userId, teamId, activity, distance, distUnit, time, type };
  /* axios POST call */
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/teamworkouts/add`, info, headers).then((response) => {
      dispatch({ type: FETCH_TEAM_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`addTeamWorkout failed: ${error.message}`);
    });
  };
}

export function fetchTeamWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    await axios.get(`${ROOT_URL}/teamworkouts/${userId}`, headers).then((response) => {
      dispatch({ type: FETCH_TEAM_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`fetchTeamWorkouts failed: ${error.message}`);
    });
  };
}

export function updateTeamWorkout(teamWorkoutId, teamWorkout) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios POST call */
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/teamworkouts/${teamWorkoutId}`, teamWorkout, headers).then((response) => {
      dispatch({ type: FETCH_TEAM_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`updateTeamWorkout failed: ${error.message}`);
    });
  };
}

export function deleteTeamWorkout(teamWorkoutId, teamId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios DELETE call */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/teamworkouts/${teamWorkoutId}/${teamId}`, headers).then((response) => {
      dispatch({ type: DELETE_TEAM_WORKOUT, payload: teamWorkoutId });
    }).catch((error) => {
      console.log(`deleteTeamWorkout failed: ${error.message}`);
    });
  };
}

export function addResult(result, teamWorkoutId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios POST call */
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/result/add/${teamWorkoutId}`, result, headers).then((response) => {
      dispatch({ type: FETCH_TEAM_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`addResult failed: ${error.message}`);
    });
  };
}

export function deleteResult(workoutId, teamWorkoutId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios DELETE call */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/results/${workoutId}/${teamWorkoutId}`, headers).then((response) => {
      dispatch({ type: DELETE_RESULT, payload: workoutId });
    }).catch((error) => {
      console.log(`deleteWorkout failed: ${error.message}`);
    });
  };
}


export function matchAthlete(query, teamId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    await axios.get(`${ROOT_URL}/athletes/${teamId}/${query}`, headers).then((response) => {
      dispatch({ type: MATCH_ATHLETE, payload: response.data });
    }).catch((error) => {
      console.log(`matchAthlete failed: ${error.message}`);
    });
  };
}
