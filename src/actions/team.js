import axios from 'axios';
import { ROOT_URL } from './index';

export const TeamActionTypes = {
  CHECK_TEAM_NAME_AVAILABILITY: 'CHECK_TEAM_NAME_AVAILABILITY',
  CHECK_TEAM_CODE_VALIDITY: 'CHECK_TEAM_CODE_VALIDITY',
};

export function checkTeamNameAvailability(query) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/team/name/${query}`).then((response) => {
      dispatch({ type: TeamActionTypes.CHECK_TEAM_NAME_AVAILABILITY, payload: response.data });
    }).catch((error) => {
      console.log(`failed to check team name availability ${error.message}`);
    });
  };
}

export function checkTeamCodeValidity(teamCode) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/team/code/${teamCode}`).then((response) => {
      dispatch({ type: TeamActionTypes.CHECK_TEAM_CODE_VALIDITY, payload: response.data });
    }).catch((error) => {
      console.log(`failed to check team name availability ${error.message}`);
    });
  };
}
