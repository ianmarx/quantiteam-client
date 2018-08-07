import axios from 'axios';
import ROOT_URL from './index';

export const AUTH_USER = 'AUTH_USER';
export const DEAUTH_USER = 'DEAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    message: error,
  };
}

export function signUpAthlete(athleteObject, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup/athlete`, athleteObject).then((response) => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      history.push(`/home/${response.data.id}`);
    }).catch((error) => {
      dispatch(authError(`Sign up failed: ${error.message}`));
    });
  };
}

export function signUpCoach(coachObject, history) {
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/signup/coach`, coachObject).then((response) => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      history.push(`/home/${response.data.id}`);
    }).catch((error) => {
      dispatch(authError(`Sign up failed: ${error.response.data}`));
    });
  };
}

export function signInUser({ email, password }, history) {
  return async (dispatch) => {
    const info = { email, password };
    await axios.post(`${ROOT_URL}/signin`, info).then((response) => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      history.push(`/home/${response.data.id}`);
    }).catch((error) => {
      dispatch(authError(`Sign in failed: ${error.response.data}`));
    });
  };
}

export function signOutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch({ type: DEAUTH_USER });
    history.push('/');
  };
}
