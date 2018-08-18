import {
  FETCH_USER_TEAM_SUCCESS,
  FETCH_USER_TEAM_FAILURE,
  FETCH_USER_TEAM_REQUEST,
  CHECK_TEAM_CODE_VALIDITY,
  CHECK_TEAM_NAME_AVAILABILITY,
} from '../actions/team';

const initialState = {
  team: [],
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
        team: action.team,
        isFetchingTeam: false,
      });
    }
    case FETCH_USER_TEAM_REQUEST: {
      return Object.assign({}, state, {
        team: action.team,
        isFetchingTeam: true,
        teamIsFetched: false,
      });
    }
    case CHECK_TEAM_NAME_AVAILABILITY: {
      let available;
      if (action.payload === null) {
        available = true;
      } else {
        available = false;
      }
      return Object.assign({}, state, {
        teamNameIsAvailable: available,
      });
    }
    case CHECK_TEAM_CODE_VALIDITY: {
      let valid;
      if (action.payload === null) {
        valid = false;
      } else {
        valid = true;
      }
      return Object.assign({}, state, {
        teamCodeIsValid: valid,
      });
    }
    default:
      return state;
  }
};

export default TeamReducer;
