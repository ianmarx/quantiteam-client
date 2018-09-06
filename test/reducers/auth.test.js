import auth from '../../src/reducers/auth';
import {
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
  AUTH_USER_REQUEST,
  DEAUTH_USER,
  RESET_AUTH,
} from '../../src/actions/auth';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
} from '../../src/actions/user';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({
      user: null,
      userId: null,
      isFetchingUser: false,
      userIsFetched: false,
      isAuthenticating: false,
      isAuthenticated: false,
      statusText: null,
    });
  });

  it('should handle AUTH_USER_SUCCESS', () => {
    const userId = '1';

    expect(auth([], {
      type: AUTH_USER_SUCCESS,
      userId: userId,
    })).toEqual({
      isAuthenticating: false,
      isAuthenticated: true,
      userId: userId,
      statusText: null,
    });
  });
  it('should handle AUTH_USER_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(auth([], {
      type: AUTH_USER_FAILURE,
      payload: payload,
    })).toEqual({
      isAuthenticating: false,
      isAuthenticated: false,
      statusText: payload.statusText,
      userId: null,
    });
  });

  it('should handle AUTH_USER_REQUEST', () => {
    expect(auth([], {
      type: AUTH_USER_REQUEST,
    })).toEqual({
      isAuthenticating: true,
      statusText: 'Authorizing...',
    });
  });

  it('should handle DEAUTH_USER', () => {
    expect(auth([], {
      type: DEAUTH_USER,
    })).toEqual({
      user: null,
      userId: null,
      isFetchingUser: false,
      userIsFetched: false,
      isAuthenticating: false,
      isAuthenticated: false,
      statusText: null,
    });
  });

  it('should handle RESET_AUTH', () => {
    expect(auth([], {
      type: RESET_AUTH,
    })).toEqual({
      user: null,
      userId: null,
      isFetchingUser: false,
      userIsFetched: false,
      isAuthenticating: false,
      isAuthenticated: false,
      statusText: null,
    });
  });

  it('should handle FETCH_USER_SUCCESS', () => {
    const user = {
      _id: '1',
      name: 'Athlete 1',
    };

    expect(auth([], {
      type: FETCH_USER_SUCCESS,
      user: user,
    })).toEqual({
      user: user,
      isFetchingUser: false,
      userIsFetched: true,
    });
  });

  it('should handle FETCH_USER_FAILURE', () => {
    expect(auth([], {
      type: FETCH_USER_FAILURE,
    })).toEqual({
      user: null,
      isFetchingUser: false,
    });
  });

  it('should handle FETCH_USER_REQUEST', () => {
    expect(auth([], {
      type: FETCH_USER_REQUEST,
    })).toEqual({
      user: null,
      isFetchingUser: true,
      userIsFetched: false,
    });
  });
});
