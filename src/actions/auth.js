import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/auth';
import { fetchUser } from './user';
import { fetchUserTeam } from './team';
import { fetchTeamWorkouts } from './teamworkout';
import { fetchSoloWorkouts } from './workout';

export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const DEAUTH_USER = 'DEAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    message: error,
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
    await Promise.all([
      dispatch(fetchUser(response.data.id)),
      dispatch(fetchUserTeam(response.data.id)),
      dispatch(fetchSoloWorkouts(response.data.id)),
      dispatch(fetchTeamWorkouts(response.data.id)),
    ]);
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
    await Promise.all([
      dispatch(fetchUser(userId)),
      dispatch(fetchUserTeam(userId)),
      dispatch(fetchSoloWorkouts(userId)),
      dispatch(fetchTeamWorkouts(userId)),
    ]);
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
    dispatch({ type: DEAUTH_USER });
    history.push('/');
  };
}
