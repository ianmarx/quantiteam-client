import { FETCH_USER } from '../actions/user';
import { MATCH_ATHLETE } from '../actions/teamworkout';

const initialState = {
  user: {},
  queryResults: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }
    case MATCH_ATHLETE: {
      return Object.assign({}, state, {
        queryResults: action.payload,
      });
    }
    default:
      return state;
  }
};

export default UserReducer;
