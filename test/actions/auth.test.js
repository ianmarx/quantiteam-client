import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  AUTH_USER_SUCCESS, AUTH_USER_FAILURE, AUTH_USER_REQUEST,
  DEAUTH_USER,
  authUserSuccess, authUserFailure, authUserRequest,
  signUpAthlete, signUpCoach, signInUser, signOutUser, reAuthUser, deauth,
} from '../../src/actions/auth';
import ROOT_URL from '../../src/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAdapter = new MockAdapter(axios);
const history = {
  push: () => {},
};

const error = {
  response: {
    status: 500,
    statusText: 'Internal Server Error',
  },
  message: 'Request failed with status code 500',
};

describe('auth actions', () => {
  it('should create an action to handle auth user success', () => {
    const response = {
      data: {
        id: '1',
      },
    };

    const expectedAction = {
      type: AUTH_USER_SUCCESS,
      userId: response.data.id,
    };

    expect(authUserSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle auth user failure', () => {
    const expectedAction = {
      type: AUTH_USER_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(authUserFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle auth user request', () => {
    const expectedAction = {
      type: AUTH_USER_REQUEST,
    };

    expect(authUserRequest()).toEqual(expectedAction);
  });

  it('should create an action to deauthenticate user', () => {
    const expectedAction = {
      type: DEAUTH_USER,
    };

    expect(deauth()).toEqual(expectedAction);
  });
});

describe('async auth actions', () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  it('handles signInUser success', async (done) => {
    const email = 'athlete@quantiteam.com';
    const password = 'password';
    const data = { email, password };

    mockAdapter.onPost(`${ROOT_URL}/signin`, data).reply(200,
      {
        token: 'authtoken',
        id: '1',
      },
    );

    const expectedActions = [
      { type: 'AUTH_USER_REQUEST' },
      {
        type: 'AUTH_USER_SUCCESS',
        userId: '1',
      },
    ];

    const store = mockStore({
      auth: {
        userId: null,
      },
    });

    await store.dispatch(signInUser(data, history));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('handles signInUser failure', async (done) => {
    const email = 'athlete@quantiteam.com';
    const password = 'password';
    const data = { email, password };

    mockAdapter.onPost(`${ROOT_URL}/signin`, data).reply(500, error);

    const expectedActions = [
      { type: 'AUTH_USER_REQUEST' },
      {
        type: 'AUTH_USER_FAILURE',
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      auth: {},
    });

    await store.dispatch(signInUser(data, history));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('handles signInUser failure', async (done) => {
    const email = 'athlete@quantiteam.com';
    const password = 'password';
    const data = { email, password };

    mockAdapter.onPost(`${ROOT_URL}/signin`, data).reply(500, error);

    const expectedActions = [
      { type: 'AUTH_USER_REQUEST' },
      {
        type: 'AUTH_USER_FAILURE',
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      auth: {},
    });

    await store.dispatch(signInUser(data, history));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should handle reauthenticating user', async () => {
    const token = 'authtoken';
    const userId = '1';

    const expectedActions = [
      {
        type: 'AUTH_USER_SUCCESS',
        userId: '1',
      },
    ];

    const store = mockStore({
      auth: {
        userId: null,
      },
    });

    await store.dispatch(reAuthUser(token, userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle signUpAthlete success', async () => {
    const athleteObject = {
      teamCode: 'asdf1234',
      name: 'Athlete 1',
      email: 'athlete@quantiteam.com',
      password: 'password',
    };

    mockAdapter.onPost(`${ROOT_URL}/signup/athlete`, athleteObject).reply(200,
      {
        token: 'authtoken',
        id: '1',
      },
    );

    const expectedActions = [
      {
        type: 'AUTH_USER_REQUEST',
      },
      {
        type: 'AUTH_USER_SUCCESS',
        userId: '1',
      },
    ];

    const store = mockStore({
      auth: {
        userId: null,
      },
    });

    await store.dispatch(signUpAthlete(athleteObject, history));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle signUpAthlete failure', async () => {
    const athleteObject = {
      teamCode: 'asdf1234',
      name: 'Athlete 1',
      email: 'athlete@quantiteam.com',
      password: 'password',
    };

    mockAdapter.onPost(`${ROOT_URL}/signup/athlete`, athleteObject).reply(500, error);

    const expectedActions = [
      {
        type: 'AUTH_USER_REQUEST',
      },
      {
        type: 'AUTH_USER_FAILURE',
        payload: {
          status: error.response.status,
          message: error.message,
        },
      },
    ];

    const store = mockStore({
      auth: {
        userId: null,
      },
    });

    await store.dispatch(signUpAthlete(athleteObject, history));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle signUpCoach success', async () => {
    const coachObject = {
      teamName: 'Team 1',
      name: 'Coach 1',
      email: 'coach@quantiteam.com',
      password: 'password',
    };

    mockAdapter.onPost(`${ROOT_URL}/signup/coach`, coachObject).reply(200,
      {
        token: 'authtoken',
        id: '1',
      },
    );

    const expectedActions = [
      {
        type: 'AUTH_USER_REQUEST',
      },
      {
        type: 'AUTH_USER_SUCCESS',
        userId: '1',
      },
    ];

    const store = mockStore({
      auth: {
        userId: null,
      },
    });

    await store.dispatch(signUpCoach(coachObject, history));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle signUpCoach failure', async () => {
    const coachObject = {
      teamName: 'Team 1',
      name: 'Coach 1',
      email: 'coach@quantiteam.com',
      password: 'password',
    };

    mockAdapter.onPost(`${ROOT_URL}/signup/coach`, coachObject).reply(500, error);

    const expectedActions = [
      {
        type: 'AUTH_USER_REQUEST',
      },
      {
        type: 'AUTH_USER_FAILURE',
        payload: {
          status: error.response.status,
          message: error.message,
        },
      },
    ];

    const store = mockStore({
      auth: {
        userId: null,
      },
    });

    await store.dispatch(signUpCoach(coachObject, history));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('should handle signOutUser', async () => {
    const store = mockStore({
      auth: {
        userId: '1',
      },
    });

    const expectedActions = [
      {
        type: 'DEAUTH_USER',
      },
    ];

    await store.dispatch(signOutUser(history));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
