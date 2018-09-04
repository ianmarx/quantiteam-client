// @flow

import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/teamworkout';

export const FETCH_TEAM_WORKOUT_SUCCESS = 'FETCH_TEAM_WORKOUT_SUCCESS';
export const FETCH_TEAM_WORKOUT_FAILURE = 'FETCH_TEAM_WORKOUT_FAILURE';
export const FETCH_TEAM_WORKOUT_REQUEST = 'FETCH_TEAM_WORKOUT_REQUEST';
export const FETCH_TEAM_WORKOUTS_SUCCESS = 'FETCH_TEAM_WORKOUTS_SUCCESS';
export const FETCH_TEAM_WORKOUTS_FAILURE = 'FETCH_TEAM_WORKOUTS_FAILURE';
export const FETCH_TEAM_WORKOUTS_REQUEST = 'FETCH_TEAM_WORKOUTS_REQUEST';
export const FETCH_TEAM_WORKOUT_RESULTS_SUCCESS = 'FETCH_TEAM_WORKOUT_RESULTS_SUCCESS';
export const FETCH_TEAM_WORKOUT_RESULTS_FAILURE = 'FETCH_TEAM_WORKOUT_RESULTS_FAILURE';
export const FETCH_TEAM_WORKOUT_RESULTS_REQUEST = 'FETCH_TEAM_WORKOUT_RESULTS_REQUEST';
export const MATCH_ATHLETE_SUCCESS = 'MATCH_ATHLETE_SUCCESS';
export const MATCH_ATHLETE_FAILURE = 'MATCH_ATHLETE_FAILURE';
export const MATCH_ATHLETE_REQUEST = 'MATCH_ATHLETE_REQUEST';
export const DELETE_TEAM_WORKOUT_SUCCESS = 'DELETE_TEAM_WORKOUT_SUCCESS';
export const DELETE_TEAM_WORKOUT_FAILURE = 'DELETE_TEAM_WORKOUT_FAILURE';
export const DELETE_TEAM_WORKOUT_REQUEST = 'DELETE_TEAM_WORKOUT_REQUEST';
export const DELETE_RESULT_SUCCESS = 'DELETE_RESULT_SUCCESS';
export const DELETE_RESULT_FAILURE = 'DELETE_RESULT_FAILURE';
export const DELETE_RESULT_REQUEST = 'DELETE_RESULT_REQUEST';
export const ADD_RESULT_SUCCESS = 'ADD_RESULT_SUCCESS';
export const ADD_RESULT_FAILURE = 'ADD_RESULT_FAILURE';
export const ADD_RESULT_REQUEST = 'ADD_RESULT_REQUEST';
export const UPDATE_RESULT_SUCCESS = 'UPDATE_RESULT_SUCCESS';
export const UPDATE_RESULT_FAILURE = 'UPDATE_RESULT_FAILURE';
export const UPDATE_RESULT_REQUEST = 'UPDATE_RESULT_REQUEST';
export const UPDATE_TEAM_WORKOUT_SUCCESS = 'UPDATE_TEAM_WORKOUT_SUCCESS';
export const UPDATE_TEAM_WORKOUT_FAILURE = 'UPDATE_TEAM_WORKOUT_FAILURE';
export const UPDATE_TEAM_WORKOUT_REQUEST = 'UPDATE_TEAM_WORKOUT_REQUEST';
export const ADD_TEAM_WORKOUT_SUCCESS = 'ADD_TEAM_WORKOUT_SUCCESS';
export const ADD_TEAM_WORKOUT_FAILURE = 'ADD_TEAM_WORKOUT_FAILURE';
export const ADD_TEAM_WORKOUT_REQUEST = 'ADD_TEAM_WORKOUT_REQUEST';

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

export function fetchTeamWorkoutsSuccess(teamWorkouts: Array<Object>) : Action {
  return {
    type: FETCH_TEAM_WORKOUTS_SUCCESS,
    teamWorkouts,
  };
}

export function fetchTeamWorkoutsFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_TEAM_WORKOUTS_FAILURE,
    error,
  );
}

export function fetchTeamWorkoutsRequest() : Action {
  return {
    type: FETCH_TEAM_WORKOUTS_REQUEST,
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

export function addTeamWorkoutSuccess(response: Object) : Action {
  return {
    type: ADD_TEAM_WORKOUT_SUCCESS,
    payload: response.data,
  };
}

export function addTeamWorkoutFailure(error: APIError) : Action {
  return getErrorAction(
    ADD_TEAM_WORKOUT_FAILURE,
    error,
  );
}

export function addTeamWorkoutRequest() : Action {
  return {
    type: ADD_TEAM_WORKOUT_REQUEST,
  };
}

export function addResultSuccess(response: Object) : Action {
  return {
    type: ADD_RESULT_SUCCESS,
    payload: response.data,
  };
}

export function addResultFailure(error: APIError) : Action {
  return getErrorAction(
    ADD_RESULT_FAILURE,
    error,
  );
}

export function addResultRequest() : Action {
  return {
    type: ADD_RESULT_REQUEST,
  };
}

export function updateResultSuccess(response: Object) : Action {
  return {
    type: UPDATE_RESULT_SUCCESS,
    payload: response.data,
  };
}

export function updateResultFailure(error: APIError) : Action {
  return getErrorAction(
    UPDATE_RESULT_FAILURE,
    error,
  );
}

export function updateResultRequest() : Action {
  return {
    type: UPDATE_RESULT_REQUEST,
  };
}

export function deleteResultSuccess(workoutId: String) : Action {
  return {
    type: DELETE_RESULT_SUCCESS,
    payload: workoutId,
  };
}

export function deleteResultFailure(error: APIError) : Action {
  return getErrorAction(
    DELETE_RESULT_FAILURE,
    error,
  );
}

export function deleteResultRequest() : Action {
  return {
    type: DELETE_RESULT_REQUEST,
  };
}

export function matchAthleteSuccess(response: Object) : Action {
  return {
    type: MATCH_ATHLETE_SUCCESS,
    payload: response.data,
  };
}

export function matchAthleteFailure(error: APIError) : Action {
  return getErrorAction(
    MATCH_ATHLETE_FAILURE,
    error,
  );
}

export function matchAthleteRequest() : Action {
  return {
    type: MATCH_ATHLETE_REQUEST,
  };
}

export function updateTeamWorkoutSuccess(response: Object) : Action {
  return {
    type: UPDATE_TEAM_WORKOUT_SUCCESS,
    payload: response.data,
  };
}

export function updateTeamWorkoutFailure(error: APIError) : Action {
  return getErrorAction(
    UPDATE_TEAM_WORKOUT_FAILURE,
    error,
  );
}

export function updateTeamWorkoutRequest() : Action {
  return {
    type: UPDATE_TEAM_WORKOUT_REQUEST,
  };
}

export function deleteTeamWorkoutSuccess(teamWorkoutId: String) : Action {
  return {
    type: DELETE_TEAM_WORKOUT_SUCCESS,
    payload: teamWorkoutId,
  };
}

export function deleteTeamWorkoutFailure(error: APIError) {
  return getErrorAction(
    DELETE_TEAM_WORKOUT_FAILURE,
    error,
  );
}

export function deleteTeamWorkoutRequest() : Action {
  return {
    type: DELETE_TEAM_WORKOUT_REQUEST,
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
    dispatch(fetchTeamWorkoutResultsRequest());
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
    dispatch(fetchTeamWorkoutResultsRequest());
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
  return async (dispatch) => {
    dispatch(addTeamWorkoutRequest());
    await axios.post(`${ROOT_URL}/teamworkouts/add`, info, headers).then((response) => {
      dispatch(addTeamWorkoutSuccess(response));
    }).catch((error) => {
      dispatch(addTeamWorkoutFailure(error));
    });
  };
}

export function fetchTeamWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    dispatch(fetchTeamWorkoutsRequest());
    await axios.get(`${ROOT_URL}/teamworkouts/${userId}`, headers).then((response) => {
      dispatch(fetchTeamWorkoutsSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchTeamWorkoutsFailure(error));
    });
  };
}

export function updateTeamWorkout(teamWorkoutId, teamWorkout) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios POST call */
  return async (dispatch) => {
    dispatch(updateTeamWorkoutRequest());
    await axios.post(`${ROOT_URL}/teamworkouts/${teamWorkoutId}`, teamWorkout, headers).then((response) => {
      dispatch(updateTeamWorkoutSuccess(response));
    }).catch((error) => {
      dispatch(updateTeamWorkoutFailure(error));
    });
  };
}

export function deleteTeamWorkout(teamWorkoutId, teamId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(deleteTeamWorkoutRequest());
    await axios.delete(`${ROOT_URL}/teamworkouts/${teamWorkoutId}/${teamId}`, headers).then((response) => {
      dispatch(deleteTeamWorkoutSuccess(teamWorkoutId));
    }).catch((error) => {
      dispatch(deleteTeamWorkoutFailure(error));
    });
  };
}

export function addResult(result, teamWorkoutId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(addResultRequest());
    await axios.post(`${ROOT_URL}/result/add/${teamWorkoutId}`, result, headers).then((response) => {
      dispatch(addResultSuccess(response));
    }).catch((error) => {
      dispatch(addResultFailure(error));
    });
  };
}

export function updateResult(workoutId, workout) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(updateResultRequest());
    await axios.put(`${ROOT_URL}/workouts/${workoutId}`, workout, headers).then((response) => {
      dispatch(updateResultSuccess(response));
    }).catch((error) => {
      dispatch(updateResultFailure(error));
    });
  };
}

export function deleteResult(workoutId, teamWorkoutId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(deleteResultRequest());
    await axios.delete(`${ROOT_URL}/results/${workoutId}/${teamWorkoutId}`, headers).then((response) => {
      dispatch(deleteResultSuccess(workoutId));
    }).catch((error) => {
      dispatch(deleteResultFailure(error));
    });
  };
}


export function matchAthlete(query, teamId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  return async (dispatch) => {
    dispatch(matchAthleteRequest());
    await axios.get(`${ROOT_URL}/athletes/${teamId}/${query}`, headers).then((response) => {
      dispatch(matchAthleteSuccess(response));
    }).catch((error) => {
      dispatch(matchAthleteFailure(error));
    });
  };
}
