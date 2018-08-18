// @flow
type fetchUserSuccess = {
  type: 'FETCH_USER_SUCCESS',
  user: Object,
}

type fetchUserFailure = {
  type: 'FETCH_USER_FAILURE',
  payload: {
    status: String,
    statusText: String,
  };
}

type fetchUserRequest = {
  type: 'FETCH_USER_REQUEST',
}

type fetchUserProfileSuccess = {
  type: 'FETCH_USER_PROFILE_SUCCESS',
  userProfile: Object,
}

type fetchUserProfileFailure = {
  type: 'FETCH_USER_PROFILE_FAILURE',
  payload: {
    status: String,
    statusText: String,
  };
}

type fetchUserProfileRequest = {
  type: 'FETCH_USER_PROFILE_REQUEST',
}

type updateUserProfileSuccess = {
  type: 'UPDATE_USER_PROFILE_SUCCESS',
  userProfile: Object,
}

type updateUserProfileFailure = {
  type: 'UPDATE_USER_PROFILE_FAILURE',
  payload: {
    status: String,
    statusText: String,
  };
}

type updateUserProfileRequest = {
  type: 'UPDATE_USER_PROFILE_REQUEST',
}

export type Action =
  fetchUserSuccess
  | fetchUserFailure
  | fetchUserRequest
  | fetchUserProfileSuccess
  | fetchUserProfileFailure
  | fetchUserProfileRequest
  | updateUserProfileSuccess
  | updateUserProfileFailure
  | updateUserProfileRequest;
