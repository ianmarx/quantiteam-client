import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  FETCH_USER_TEAM_SUCCESS, FETCH_USER_TEAM_FAILURE, FETCH_USER_TEAM_REQUEST,
  CHECK_TEAM_CODE_SUCCESS, CHECK_TEAM_CODE_FAILURE, CHECK_TEAM_CODE_REQUEST,
  CHECK_TEAM_NAME_SUCCESS, CHECK_TEAM_NAME_FAILURE, CHECK_TEAM_NAME_REQUEST,
  fetchUserTeamSuccess, fetchUserTeamFailure, fetchUserTeamRequest, fetchUserTeam,
  checkTeamNameSuccess, checkTeamNameFailure, checkTeamNameRequest, checkTeamName,
  checkTeamCodeSuccess, checkTeamCodeFailure, checkTeamCodeRequest, checkTeamCode,
} from '../../src/actions/team';
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

describe('team actions', () => {
  it('should create an action to handle fetch user team success', () => {
    const response = {
      data: {
        team: {
          _id: '1',
          name: 'Team 1',
        },
        isCoach: true,
      },
    };

    const expectedAction = {
      type: FETCH_USER_TEAM_SUCCESS,
      team: response.data.team,
      isCoach: response.data.isCoach,
    };

    expect(fetchUserTeamSuccess(response.data.team, response.data.isCoach)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user team failure', () => {
    const expectedAction = {
      type: FETCH_USER_TEAM_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(fetchUserTeamFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user team request', () => {
    const expectedAction = {
      type: FETCH_USER_TEAM_REQUEST,
    };

    expect(fetchUserTeamRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle check team code success', () => {
    const response = {
      data: null,
    };

    const expectedAction = {
      type: CHECK_TEAM_CODE_SUCCESS,
      payload: null,
    };

    expect(checkTeamCodeSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle check team code failure', () => {
    const expectedAction = {
      type: CHECK_TEAM_CODE_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(checkTeamCodeFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle check team code request', () => {
    const expectedAction = {
      type: CHECK_TEAM_CODE_REQUEST,
    };

    expect(checkTeamCodeRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle check team name success', () => {
    const response = {
      data: null,
    };

    const expectedAction = {
      type: CHECK_TEAM_NAME_SUCCESS,
      payload: null,
    };

    expect(checkTeamNameSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle check team name failure', () => {
    const expectedAction = {
      type: CHECK_TEAM_NAME_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(checkTeamNameFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle check team name request', () => {
    const expectedAction = {
      type: CHECK_TEAM_NAME_REQUEST,
    };

    expect(checkTeamNameRequest()).toEqual(expectedAction);
  });
});

describe('async team actions', () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  it('handles fetchUserTeam success', async () => {
    const userId = '1';
    const headers = { authorization: { token: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/team/${userId}`, headers).reply(200,
      {
        team: {
          _id: '1',
          name: 'Team 1',
        },
        isCoach: true,
      },
    );

    const expectedActions = [
      {
        type: 'FETCH_USER_TEAM_REQUEST',
      },
      {
        type: 'FETCH_USER_TEAM_SUCCESS',
        team: {
          _id: '1',
          name: 'Team 1',
        },
        isCoach: true,
      },
    ];

    const store = mockStore({
      team: {
        team: null,
        isCoach: false,
      },
    });

    await store.dispatch(fetchUserTeam(userId, history));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchUserTeam failure', async () => {
    const userId = '1';
    const headers = { authorization: { token: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/team/${userId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: 'FETCH_USER_TEAM_REQUEST',
      },
      {
        type: 'FETCH_USER_TEAM_FAILURE',
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      team: {
        team: {
          _id: '1',
          name: 'Team 1',
        },
        isCoach: true,
      },
    });

    await store.dispatch(fetchUserTeam(userId, history));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle checkTeamCode success', async () => {
    const teamCode = 'asdf1234';

    mockAdapter.onGet(`${ROOT_URL}/team/code/${teamCode}`).reply(200,
      {
        data: {
          _id: '1',
          teamName: 'Team 1',
        },
      },
    );

    const expectedActions = [
      {
        type: 'CHECK_TEAM_CODE_REQUEST',
      },
      {
        type: 'CHECK_TEAM_CODE_SUCCESS',
        payload: {
          data: {
            _id: '1',
            teamName: 'Team 1',
          },
        },
      },
    ];

    const store = mockStore({
      team: {
        team: null,
        teamCodeIsValid: false,
      },
    });

    await store.dispatch(checkTeamCode(teamCode));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle checkTeamCode failure', async () => {
    const teamCode = 'asdf1234';

    mockAdapter.onGet(`${ROOT_URL}/team/code/${teamCode}`).reply(500, error);

    const expectedActions = [
      {
        type: 'CHECK_TEAM_CODE_REQUEST',
      },
      {
        type: 'CHECK_TEAM_CODE_FAILURE',
        payload: {
          status: error.response.status,
          message: error.message,
        },
      },
    ];

    const store = mockStore({
      team: {
        team: null,
        teamCodeIsValid: false,
      },
    });

    await store.dispatch(checkTeamCode(teamCode));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle checkTeamName success', async () => {
    const query = 'Team 1';

    mockAdapter.onGet(`${ROOT_URL}/team/name/${query}`).reply(200,
      {
        data: {
          _id: '1',
          teamName: 'Team 1',
        },
      },
    );

    const expectedActions = [
      {
        type: 'CHECK_TEAM_NAME_REQUEST',
      },
      {
        type: 'CHECK_TEAM_NAME_SUCCESS',
        payload: {
          data: {
            _id: '1',
            teamName: 'Team 1',
          },
        },
      },
    ];

    const store = mockStore({
      team: {
        team: null,
        teamNameIsAvailable: false,
      },
    });

    await store.dispatch(checkTeamName(query));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle checkTeamName failure', async () => {
    const query = 'Team 1';

    mockAdapter.onGet(`${ROOT_URL}/team/name/${query}`).reply(500, error);

    const expectedActions = [
      {
        type: 'CHECK_TEAM_NAME_REQUEST',
      },
      {
        type: 'CHECK_TEAM_NAME_FAILURE',
        payload: {
          status: error.response.status,
          message: error.message,
        },
      },
    ];

    const store = mockStore({
      team: {
        team: null,
        teamNameIsAvailable: false,
      },
    });

    await store.dispatch(checkTeamName(query));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
