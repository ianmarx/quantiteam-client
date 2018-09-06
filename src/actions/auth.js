import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/auth';

export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const DEAUTH_USER = 'DEAUTH_USER';
export const RESET_AUTH = 'RESET_AUTH';

export function deauth() : Action {
  return {
    type: DEAUTH_USER,
  };
}

export function resetAuth() : Action {
  return {
    type: RESET_AUTH,
  };
}

export function authUserSuccess(response: Object) : Action {
  localStorage.setItem('userId', response.data.id);
  return {
    type: AUTH_USER_SUCCESS,
    userId: response.data.id,
  };
}

export function authUserFailure(error: APIError) : Action {
  return getErrorAction(
    AUTH_USER_FAILURE,
    error,
  );
}

export function authUserRequest() : Action {
  return {
    type: AUTH_USER_REQUEST,
  };
}

export function handleAuthSuccess(response: Object, history) : Function {
  return async (dispatch) => {
    localStorage.setItem('token', response.data.token);
    dispatch(authUserSuccess(response));
    history.push('/');
  };
}

export function reAuthUser(localToken: String, userId: String) : Function {
  return async (dispatch) => {
    const res = {
      data: {
        token: localToken,
        id: userId,
      },
    };
    dispatch(authUserSuccess(res));
  };
}

export function signUpAthlete(athleteObject, history) {
  return async (dispatch) => {
    dispatch(authUserRequest());
    await axios.post(`${ROOT_URL}/signup/athlete`, athleteObject).then((response) => {
      dispatch(handleAuthSuccess(response, history));
    }).catch((error) => {
      dispatch(authUserFailure(error));
    });
  };
}

export function signUpCoach(coachObject, history) {
  return async (dispatch) => {
    dispatch(authUserRequest());
    await axios.post(`${ROOT_URL}/signup/coach`, coachObject).then((response) => {
      dispatch(handleAuthSuccess(response, history));
    }).catch((error) => {
      dispatch(authUserFailure(error));
    });
  };
}

export function signInUser({ email, password }, history) {
  const info = { email, password };
  return async (dispatch) => {
    dispatch(authUserRequest());
    await axios.post(`${ROOT_URL}/signin`, info).then((response) => {
      dispatch(handleAuthSuccess(response, history));
    }).catch((error) => {
      dispatch(authUserFailure(error));
    });
  };
}

export function signOutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(deauth());
    history.push('/');
  };
}
