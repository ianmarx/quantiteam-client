import {
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
  AUTH_USER_REQUEST,
  DEAUTH_USER,
} from '../actions/auth';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
} from '../actions/user';

const initialState = {
  user: null,
  userId: null,
  isFetchingUser: false,
  userIsFetched: false,
  isAuthenticating: false,
  isAuthenticated: false,
  statusText: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        userId: action.userId,
        statusText: null,
      });
    case AUTH_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        statusText: action.payload.statusText || action.payload.message,
        userId: null,
      });
    case AUTH_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: 'Authorizing...',
      });
    case DEAUTH_USER:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        userId: null,
      });
    case FETCH_USER_SUCCESS: {
      return Object.assign({}, state, {
        user: action.user,
        isFetchingUser: false,
        userIsFetched: true,
      });
    }
    case FETCH_USER_FAILURE: {
      return Object.assign({}, state, {
        user: null,
        isFetchingUser: false,
      });
    }
    case FETCH_USER_REQUEST: {
      return Object.assign({}, state, {
        user: null,
        isFetchingUser: true,
        userIsFetched: false,
      });
    }
    default:
      return state;
  }
};

export default AuthReducer;
