import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/team';

export const FETCH_USER_TEAM_SUCCESS = 'FETCH_USER_TEAM_SUCCESS';
export const FETCH_USER_TEAM_FAILURE = 'FETCH_USER_TEAM_FAILURE';
export const FETCH_USER_TEAM_REQUEST = 'FETCH_USER_TEAM_REQUEST';
export const CHECK_TEAM_NAME_AVAILABILITY = 'CHECK_TEAM_NAME_AVAILABILITY';
export const CHECK_TEAM_CODE_VALIDITY = 'CHECK_TEAM_CODE_VALIDITY';

export function fetchUserTeamSuccess(team: Object, isCoach: Boolean) : Action {
  return {
    type: FETCH_USER_TEAM_SUCCESS,
    team,
    isCoach,
  };
}

export function fetchUserTeamFailure(error: APIError) : Action {
  return getErrorAction({
    type: FETCH_USER_TEAM_FAILURE,
    error,
  });
}

export function fetchUserTeamRequest() : Action {
  return {
    type: FETCH_USER_TEAM_REQUEST,
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

export function checkTeamNameAvailability(query) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/team/name/${query}`).then((response) => {
      dispatch({ type: CHECK_TEAM_NAME_AVAILABILITY, payload: response.data });
    }).catch((error) => {
      console.log(`failed to check team name availability ${error.message}`);
    });
  };
}

export function checkTeamCodeValidity(teamCode) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/team/code/${teamCode}`).then((response) => {
      dispatch({ type: CHECK_TEAM_CODE_VALIDITY, payload: response.data });
    }).catch((error) => {
      console.log(`failed to check team name availability ${error.message}`);
    });
  };
}
