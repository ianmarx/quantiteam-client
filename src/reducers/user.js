import {
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
} from '../actions/user';
import {
  MATCH_ATHLETE_SUCCESS,
  MATCH_ATHLETE_FAILURE,
  MATCH_ATHLETE_REQUEST,
} from '../actions/teamworkout';

const initialState = {
  userProfile: null,
  queryResults: null,
  isFetchingUserProfile: false,
  userProfileIsFetched: false,
  isUpdatingUserProfile: false,
  userProfileIsUpdated: false,
  statusText: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingUserProfile: false,
        userProfileIsFetched: true,
        userProfile: action.userProfile,
      });
    }
    case FETCH_USER_PROFILE_FAILURE: {
      return Object.assign({}, state, {
        isFetchingUserProfile: false,
        userProfile: null,
        statusText: action.payload.statusText,
      });
    }
    case FETCH_USER_PROFILE_REQUEST: {
      return Object.assign({}, state, {
        isFetchingUserProfile: true,
        userProfileIsFetched: false,
        userProfile: null,
      });
    }
    case UPDATE_USER_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        isUpdatingUserProfile: false,
        userProfileIsUpdated: true,
        userProfile: action.userProfile,
      });
    }
    case UPDATE_USER_PROFILE_FAILURE: {
      return Object.assign({}, state, {
        isUpdatingUserProfile: false,
        userProfileIsUpdated: false,
        statusText: action.payload.statusText,
      });
    }
    case UPDATE_USER_PROFILE_REQUEST: {
      return Object.assign({}, state, {
        isUpdatingUserProfile: true,
        userProfileIsUpdated: false,
      });
    }
    case MATCH_ATHLETE_SUCCESS: {
      return Object.assign({}, state, {
        queryResults: action.payload,
      });
    }
    case MATCH_ATHLETE_FAILURE: {
      return Object.assign({}, state, {
        queryResults: null,
      });
    }
    case MATCH_ATHLETE_REQUEST: {
      return state;
    }
    default:
      return state;
  }
};

export default UserReducer;
