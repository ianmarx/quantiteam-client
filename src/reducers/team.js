import { ActionTypes } from '../actions';
import { TeamActionTypes } from '../actions/team';

const initialState = {
  team: [],
  teamNameIsAvailable: false,
  teamCodeIsValid: false,
  isCoach: false,
};

const TeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TEAM: {
      return Object.assign({}, state, {
        team: action.payload.team,
        isCoach: action.payload.isCoach,
      });
    }
    case TeamActionTypes.CHECK_TEAM_NAME_AVAILABILITY: {
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
    case TeamActionTypes.CHECK_TEAM_CODE_VALIDITY: {
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
