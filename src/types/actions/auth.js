// @flow
type authUserSuccess = {
  type: 'AUTH_USER_SUCCESS',
  userId: String,
}

type authUserFailure = {
  type: 'AUTH_USER_FAILURE',
  payload: {
    status: string,
    statusText: string,
  };
}

type authUserRequest = {
  type: 'AUTH_USER_REQUEST',
}

export type Action =
  authUserSuccess
  | authUserFailure
  | authUserRequest;
