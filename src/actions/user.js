import axios from 'axios';
import ROOT_URL from './index';
import getErrorAction from '../utils/actions';
import type { APIError } from '../types';
import type { Action } from '../types/actions/user';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';

export function fetchUserSuccess(user: Object) : Action {
  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
}

export function fetchUserFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_USER_FAILURE,
    error,
  );
}

export function fetchUserRequest() : Action {
  return {
    type: FETCH_USER_REQUEST,
  };
}

export function fetchUserProfileSuccess(userProfile: Object) : Action {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    userProfile,
  };
}

export function fetchUserProfileFailure(error: APIError) : Action {
  return getErrorAction(
    FETCH_USER_PROFILE_FAILURE,
    error,
  );
}

export function fetchUserProfileRequest() : Action {
  return {
    type: FETCH_USER_PROFILE_REQUEST,
  };
}

export function updateUserProfileSuccess(userProfile: Object) : Action {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    userProfile,
  };
}

export function updateUserProfileFailure(error: APIError) : Action {
  return getErrorAction(
    UPDATE_USER_PROFILE_FAILURE,
    error,
  );
}

export function updateUserProfileRequest() : Action {
  return {
    type: UPDATE_USER_PROFILE_REQUEST,
  };
}

export function fetchUser(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    await axios.get(`${ROOT_URL}/users/${userId}`, headers).then((response) => {
      dispatch(fetchUserSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchUserFailure(error));
    });
  };
}

export function fetchUserProfile(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return async (dispatch) => {
    dispatch(fetchUserProfileRequest());
    await axios.get(`${ROOT_URL}/profile/${userId}`, headers).then((response) => {
      dispatch(fetchUserProfileSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchUserProfileFailure(error));
    });
  };
}

export function updateUserProfile(userId, user) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios PUT call */
  return async (dispatch) => {
    dispatch(updateUserProfileRequest());
    await axios.put(`${ROOT_URL}/users/${userId}`, user, headers).then((response) => {
      dispatch(updateUserProfileSuccess(response.data));
    }).catch((error) => {
      dispatch(updateUserProfileFailure(error));
    });
  };
}
