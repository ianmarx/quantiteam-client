import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/team';

export const FETCH_USER_TEAM_SUCCESS = 'FETCH_USER_TEAM_SUCCESS';
export const FETCH_USER_TEAM_FAILURE = 'FETCH_USER_TEAM_FAILURE';
export const FETCH_USER_TEAM_REQUEST = 'FETCH_USER_TEAM_REQUEST';
export const CHECK_TEAM_NAME_SUCCESS = 'CHECK_TEAM_NAME_SUCCESS';
export const CHECK_TEAM_NAME_FAILURE = 'CHECK_TEAM_NAME_FAILURE';
export const CHECK_TEAM_NAME_REQUEST = 'CHECK_TEAM_NAME_REQUEST';
export const CHECK_TEAM_CODE_SUCCESS = 'CHECK_TEAM_CODE_SUCCESS';
export const CHECK_TEAM_CODE_FAILURE = 'CHECK_TEAM_CODE_FAILURE';
export const CHECK_TEAM_CODE_REQUEST = 'CHECK_TEAM_CODE_REQUEST';

export function fetchUserTeamSuccess(team: Object, isCoach: Boolean) : Action {
  return {
    type: FETCH_USER_TEAM_SUCCESS,
    team,
    isCoach,
  };
}

export function fetchUserTeamFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_USER_TEAM_FAILURE,
    error,
  );
}

export function fetchUserTeamRequest() : Action {
  return {
    type: FETCH_USER_TEAM_REQUEST,
  };
}

export function checkTeamCodeSuccess(response: Object) : Action {
  return {
    type: CHECK_TEAM_CODE_SUCCESS,
    payload: response.data,
  };
}

export function checkTeamCodeFailure(error: APIError) : Action {
  return getErrorAction(
    CHECK_TEAM_CODE_FAILURE,
    error,
  );
}

export function checkTeamCodeRequest() : Action {
  return {
    type: CHECK_TEAM_CODE_REQUEST,
  };
}

export function checkTeamNameSuccess(response: Object) : Action {
  return {
    type: CHECK_TEAM_NAME_SUCCESS,
    payload: response.data,
  };
}

export function checkTeamNameFailure(error: APIError) : Action {
  return getErrorAction(
    CHECK_TEAM_NAME_FAILURE,
    error,
  );
}

export function checkTeamNameRequest() : Action {
  return {
    type: CHECK_TEAM_NAME_REQUEST,
  };
}

export function fetchUserTeam(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    dispatch(fetchUserTeamRequest());
    await axios.get(`${ROOT_URL}/team/${userId}`, headers).then((response) => {
      dispatch(fetchUserTeamSuccess(response.data.team, response.data.isCoach));
    }).catch((error) => {
      dispatch(fetchUserTeamFailure(error));
    });
  };
}

export function checkTeamName(query) {
  return async (dispatch) => {
    dispatch(checkTeamNameRequest());
    await axios.get(`${ROOT_URL}/team/name/${query}`).then((response) => {
      dispatch(checkTeamNameSuccess(response));
    }).catch((error) => {
      dispatch(checkTeamNameFailure(error));
    });
  };
}

export function checkTeamCode(teamCode) {
  return async (dispatch) => {
    dispatch(checkTeamCodeRequest());
    await axios.get(`${ROOT_URL}/team/code/${teamCode}`).then((response) => {
      dispatch(checkTeamCodeSuccess(response));
    }).catch((error) => {
      dispatch(checkTeamCodeFailure(error));
    });
  };
}
