import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_REQUEST,
  FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILURE, FETCH_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_REQUEST,
  fetchUserSuccess, fetchUserFailure, fetchUserRequest, fetchUser,
  fetchUserProfileSuccess, fetchUserProfileFailure, fetchUserProfileRequest, fetchUserProfile,
  updateUserProfileSuccess, updateUserProfileFailure, updateUserProfileRequest, updateUserProfile,
} from '../../src/actions/user';
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

describe('user actions', () => {
  it('should create an action to handle fetch user success', () => {
    const user = {
      _id: '1',
      name: 'Athlete 1',
    };

    const expectedAction = {
      type: FETCH_USER_SUCCESS,
      user,
    };

    expect(fetchUserSuccess(user)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user failure', () => {
    const expectedAction = {
      type: FETCH_USER_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(fetchUserFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user request', () => {
    const expectedAction = {
      type: 'FETCH_USER_REQUEST',
    };

    expect(fetchUserRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user profile success', () => {
    const userProfile = {
      _id: '1',
      name: 'Athlete 1',
    };

    const expectedAction = {
      type: FETCH_USER_PROFILE_SUCCESS,
      userProfile,
    };

    expect(fetchUserProfileSuccess(userProfile)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user profile failure', () => {
    const expectedAction = {
      type: FETCH_USER_PROFILE_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(fetchUserProfileFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user profile request', () => {
    const expectedAction = {
      type: 'FETCH_USER_PROFILE_REQUEST',
    };

    expect(fetchUserProfileRequest()).toEqual(expectedAction);
  });


  it('should create an action to handle update user profile success', () => {
    const userProfile = {
      _id: '1',
      name: 'Athlete 1',
    };

    const expectedAction = {
      type: UPDATE_USER_PROFILE_SUCCESS,
      userProfile,
    };

    expect(updateUserProfileSuccess(userProfile)).toEqual(expectedAction);
  });

  it('should create an action to handle update user profile failure', () => {
    const expectedAction = {
      type: UPDATE_USER_PROFILE_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(updateUserProfileFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle update user profile request', () => {
    const expectedAction = {
      type: 'UPDATE_USER_PROFILE_REQUEST',
    };

    expect(updateUserProfileRequest()).toEqual(expectedAction);
  });
});

describe('async user actions', () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  it('handles fetchUser success', async () => {
    const userId = '1';
    const user = {
      _id: '1',
      name: 'Athlete 1',
    };
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/users/${userId}`, headers).reply(200,
      user,
    );

    const expectedActions = [
      {
        type: 'FETCH_USER_REQUEST',
      },
      {
        type: 'FETCH_USER_SUCCESS',
        user,
      },
    ];

    const store = mockStore({
      auth: {},
      user: {},
    });

    await store.dispatch(fetchUser(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchUser failure', async () => {
    const userId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/users/${userId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: 'FETCH_USER_REQUEST',
      },
      {
        type: 'FETCH_USER_FAILURE',
        payload: {
          status: error.response.status,
          message: error.message,
        },
      },
    ];

    const store = mockStore({
      auth: {},
    });

    await store.dispatch(fetchUser(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchUserProfile success', async () => {
    const userId = '1';
    const userProfile = {
      _id: '1',
      name: 'Athlete 1',
    };
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/profile/${userId}`, headers).reply(200,
      userProfile,
    );

    const expectedActions = [
      {
        type: 'FETCH_USER_PROFILE_REQUEST',
      },
      {
        type: 'FETCH_USER_PROFILE_SUCCESS',
        userProfile,
      },
    ];

    const store = mockStore({
      auth: {},
      user: {},
    });

    await store.dispatch(fetchUserProfile(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchUserProfile failure', async () => {
    const userId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/profile/${userId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: 'FETCH_USER_PROFILE_REQUEST',
      },
      {
        type: 'FETCH_USER_PROFILE_FAILURE',
        payload: {
          status: error.response.status,
          message: error.message,
        },
      },
    ];

    const store = mockStore({
      auth: {},
    });

    await store.dispatch(fetchUserProfile(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles updateUserProfile success', async () => {
    const userId = '1';
    const userProfile = {
      _id: '1',
      name: 'Athlete 1',
    };
    // const headers = { headers: { authorization: undefined } };

    mockAdapter.onPut(`${ROOT_URL}/users/${userId}`, userProfile).reply(200,
      userProfile,
    );

    const expectedActions = [
      {
        type: 'UPDATE_USER_PROFILE_REQUEST',
      },
      {
        type: 'UPDATE_USER_PROFILE_SUCCESS',
        userProfile,
      },
    ];

    const store = mockStore({
      auth: {},
      user: {},
    });

    await store.dispatch(updateUserProfile(userId, userProfile));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles updateUserProfile failure', async () => {
    const userId = '1';
    // const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onPut(`${ROOT_URL}/users/${userId}`).reply(500, error);

    const expectedActions = [
      {
        type: 'UPDATE_USER_PROFILE_REQUEST',
      },
      {
        type: 'UPDATE_USER_PROFILE_FAILURE',
        payload: {
          status: error.response.status,
          message: error.message,
        },
      },
    ];

    const store = mockStore({
      auth: {},
    });

    await store.dispatch(updateUserProfile(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
