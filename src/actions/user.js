import axios from 'axios';
import ROOT_URL from './index';

export const FETCH_USER = 'FETCH_USER';

export function fetchUser(userId) {
  /* use token for authenticated route (repeated in all authenticated routes) */
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    await axios.get(`${ROOT_URL}/users/${userId}`, headers).then((response) => {
      dispatch({ type: FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log(`fetchUser failed ${error.message}`);
    });
  };
}

export function updateUser(userId, user) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios PUT call */
  return async (dispatch) => {
    await axios.put(`${ROOT_URL}/users/${userId}`, user, headers).then((response) => {
      dispatch({ type: FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log(`updateUser failed: ${error.message}`);
    });
  };
}
