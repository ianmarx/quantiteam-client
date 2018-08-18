// @flow
type fetchUserTeamSuccess = {
  type: 'FETCH_USER_TEAM_SUCCESS',
  team: Object,
  isCoach: Boolean,
}

type fetchUserTeamFailure = {
  type: 'FETCH_USER_TEAM_FAILURE',
  payload: {
    status: String,
    statusText: String,
  };
}

type fetchUserTeamRequest = {
  type: 'FETCH__USER_TEAM_REQUEST',
}

export type Action =
  fetchUserTeamSuccess
  | fetchUserTeamFailure
  | fetchUserTeamRequest;
