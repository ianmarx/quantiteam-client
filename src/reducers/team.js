import {
  FETCH_USER_TEAM_SUCCESS,
  FETCH_USER_TEAM_FAILURE,
  FETCH_USER_TEAM_REQUEST,
  CHECK_TEAM_CODE_SUCCESS,
  CHECK_TEAM_CODE_FAILURE,
  CHECK_TEAM_CODE_REQUEST,
  CHECK_TEAM_NAME_SUCCESS,
  CHECK_TEAM_NAME_FAILURE,
  CHECK_TEAM_NAME_REQUEST,
} from '../actions/team';

const initialState = {
  team: null,
  isFetchingTeam: false,
  teamIsFetched: false,
  statusText: null,
  teamNameIsAvailable: false,
  teamCodeIsValid: false,
  isCoach: false,
};

const TeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_TEAM_SUCCESS: {
      return Object.assign({}, state, {
        team: action.team,
        isCoach: action.isCoach,
        isFetchingTeam: false,
        teamIsFetched: true,
      });
    }
    case FETCH_USER_TEAM_FAILURE: {
      return Object.assign({}, state, {
        team: null,
        isFetchingTeam: false,
      });
    }
    case FETCH_USER_TEAM_REQUEST: {
      return Object.assign({}, state, {
        isFetchingTeam: true,
        teamIsFetched: false,
      });
    }
    case CHECK_TEAM_NAME_SUCCESS: {
      return Object.assign({}, state, {
        teamNameIsAvailable: action.payload === null,
      });
    }
    case CHECK_TEAM_NAME_FAILURE: {
      return Object.assign({}, state, {
        statusText: action.payload.message,
        teamNameIsAvailable: false,
      });
    }
    case CHECK_TEAM_NAME_REQUEST: {
      return state;
    }
    case CHECK_TEAM_CODE_SUCCESS: {
      return Object.assign({}, state, {
        teamCodeIsValid: !(action.payload === null),
      });
    }
    case CHECK_TEAM_CODE_FAILURE: {
      return Object.assign({}, state, {
        statusText: action.payload.message,
        teamCodeIsValid: false,
      });
    }
    case CHECK_TEAM_CODE_REQUEST: {
      return state;
    }
    default:
      return state;
  }
};

export default TeamReducer;
