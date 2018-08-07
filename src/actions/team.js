import axios from 'axios';
import ROOT_URL from './index';

export const FETCH_TEAM = 'FETCH_TEAM';
export const CHECK_TEAM_NAME_AVAILABILITY = 'CHECK_TEAM_NAME_AVAILABILITY';
export const CHECK_TEAM_CODE_VALIDITY = 'CHECK_TEAM_CODE_VALIDITY';

export function fetchUserTeam(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    await axios.get(`${ROOT_URL}/team/${userId}`, headers).then((response) => {
      dispatch({ type: FETCH_TEAM, payload: response.data });
    }).catch((error) => {
      console.log(`fetchWorkout failed: ${error.message}`);
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
