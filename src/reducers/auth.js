import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
} from '../actions/auth';

const initialState = {
  authenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return Object.assign({}, state, {
        authenticated: true,
      });
    case DEAUTH_USER:
      return Object.assign({}, state, {
        authenticated: false,
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
      });
    default:
      return state;
  }
};

export default AuthReducer;
