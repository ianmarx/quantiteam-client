import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  FETCH_TEAM_WORKOUT_SUCCESS, FETCH_TEAM_WORKOUT_FAILURE, FETCH_TEAM_WORKOUT_REQUEST,
  FETCH_TEAM_WORKOUTS_SUCCESS, FETCH_TEAM_WORKOUTS_FAILURE, FETCH_TEAM_WORKOUTS_REQUEST,
  FETCH_TEAM_WORKOUT_RESULTS_SUCCESS, FETCH_TEAM_WORKOUT_RESULTS_FAILURE, FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
  MATCH_ATHLETE_SUCCESS, MATCH_ATHLETE_FAILURE, MATCH_ATHLETE_REQUEST,
  DELETE_TEAM_WORKOUT_SUCCESS, DELETE_TEAM_WORKOUT_FAILURE, DELETE_TEAM_WORKOUT_REQUEST,
  DELETE_RESULT_SUCCESS, DELETE_RESULT_FAILURE, DELETE_RESULT_REQUEST,
  ADD_RESULT_SUCCESS, ADD_RESULT_FAILURE, ADD_RESULT_REQUEST,
  UPDATE_RESULT_SUCCESS, UPDATE_RESULT_FAILURE, UPDATE_RESULT_REQUEST,
  UPDATE_TEAM_WORKOUT_SUCCESS, UPDATE_TEAM_WORKOUT_FAILURE, UPDATE_TEAM_WORKOUT_REQUEST,
  ADD_TEAM_WORKOUT_SUCCESS, ADD_TEAM_WORKOUT_FAILURE, ADD_TEAM_WORKOUT_REQUEST,
  fetchTeamWorkoutSuccess, fetchTeamWorkoutFailure, fetchTeamWorkoutRequest, fetchTeamWorkout,
  fetchTeamWorkoutsSuccess, fetchTeamWorkoutsFailure, fetchTeamWorkoutsRequest, fetchTeamWorkouts,
  fetchTeamWorkoutResultsSuccess, fetchTeamWorkoutResultsFailure, fetchTeamWorkoutResultsRequest, fetchDistResults, fetchTimeResults,
  matchAthleteSuccess, matchAthleteFailure, matchAthleteRequest, matchAthlete,
  deleteTeamWorkoutSuccess, deleteTeamWorkoutFailure, deleteTeamWorkoutRequest, deleteTeamWorkout,
  deleteResultSuccess, deleteResultFailure, deleteResultRequest, deleteResult,
  addResultSuccess, addResultFailure, addResultRequest, addResult,
  updateResultSuccess, updateResultFailure, updateResultRequest, updateResult,
  updateTeamWorkoutSuccess, updateTeamWorkoutFailure, updateTeamWorkoutRequest, updateTeamWorkout,
  addTeamWorkoutSuccess, addTeamWorkoutFailure, addTeamWorkoutRequest, addTeamWorkout,
} from '../../src/actions/teamworkout';
import ROOT_URL from '../../src/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAdapter = new MockAdapter(axios);
const error = {
  response: {
    status: 500,
    statusText: 'Internal Server Error',
  },
  message: 'Request failed with status code 500',
};

describe('team workout actions', () => {
  it('should create an action to handle fetch team workout success', () => {
    const teamWorkoutObject = {
      _id: '1',
      distance: 2000,
    };

    const expectedAction = {
      type: FETCH_TEAM_WORKOUT_SUCCESS,
      teamWorkout: teamWorkoutObject,
    };

    expect(fetchTeamWorkoutSuccess(teamWorkoutObject)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch team workout failure', () => {
    const expectedAction = {
      type: FETCH_TEAM_WORKOUT_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(fetchTeamWorkoutFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: FETCH_TEAM_WORKOUT_REQUEST,
    };

    expect(fetchTeamWorkoutRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle fetch team workouts success', () => {
    const teamWorkoutArray = [
      {
        _id: '1',
        distance: 2000,
      },
    ];

    const expectedAction = {
      type: FETCH_TEAM_WORKOUTS_SUCCESS,
      teamWorkouts: teamWorkoutArray,
    };

    expect(fetchTeamWorkoutsSuccess(teamWorkoutArray)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch team workouts failure', () => {
    const expectedAction = {
      type: FETCH_TEAM_WORKOUTS_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(fetchTeamWorkoutsFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: FETCH_TEAM_WORKOUTS_REQUEST,
    };

    expect(fetchTeamWorkoutsRequest()).toEqual(expectedAction);
  });


  it('should create an action to handle fetch team workout results success', () => {
    const resultArray = [
      {
        _id: '1',
        distance: 2000,
        timeString: '6:00',
      },
    ];

    const expectedAction = {
      type: FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
      teamWorkoutResults: resultArray,
    };

    expect(fetchTeamWorkoutResultsSuccess(resultArray)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch team workout results failure', () => {
    const expectedAction = {
      type: FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(fetchTeamWorkoutResultsFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
    };

    expect(fetchTeamWorkoutResultsRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle add team workout success', () => {
    const response = {
      data: {
        _id: '1',
        distance: 2000,
      },
    };

    const expectedAction = {
      type: ADD_TEAM_WORKOUT_SUCCESS,
      payload: response.data,
    };

    expect(addTeamWorkoutSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle add team workout failure', () => {
    const expectedAction = {
      type: ADD_TEAM_WORKOUT_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(addTeamWorkoutFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: ADD_TEAM_WORKOUT_REQUEST,
    };

    expect(addTeamWorkoutRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle add result success', () => {
    const response = {
      data: {
        _id: '1',
        distance: 2000,
        timeString: '6:00',
      },
    };

    const expectedAction = {
      type: ADD_RESULT_SUCCESS,
      payload: response.data,
    };

    expect(addResultSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle add result failure', () => {
    const expectedAction = {
      type: ADD_RESULT_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(addResultFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: ADD_RESULT_REQUEST,
    };

    expect(addResultRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle update result success', () => {
    const response = {
      data: {
        _id: '1',
        distance: 2000,
        timeString: '6:00',
      },
    };

    const expectedAction = {
      type: UPDATE_RESULT_SUCCESS,
      payload: response.data,
    };

    expect(updateResultSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle update result failure', () => {
    const expectedAction = {
      type: UPDATE_RESULT_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(updateResultFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: UPDATE_RESULT_REQUEST,
    };

    expect(updateResultRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle delete result success', () => {
    const workoutId = '1';

    const expectedAction = {
      type: DELETE_RESULT_SUCCESS,
      payload: workoutId,
    };

    expect(deleteResultSuccess(workoutId)).toEqual(expectedAction);
  });

  it('should create an action to handle delete result failure', () => {
    const expectedAction = {
      type: DELETE_RESULT_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(deleteResultFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: DELETE_RESULT_REQUEST,
    };

    expect(deleteResultRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle match athlete success', () => {
    const response = {
      data: [
        {
          _id: '1',
          name: 'Athlete 1',
        },
      ],
    };

    const expectedAction = {
      type: MATCH_ATHLETE_SUCCESS,
      payload: response.data,
    };

    expect(matchAthleteSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle match athlete failure', () => {
    const expectedAction = {
      type: MATCH_ATHLETE_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(matchAthleteFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: MATCH_ATHLETE_REQUEST,
    };

    expect(matchAthleteRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle update team workout success', () => {
    const response = {
      data: {
        _id: '1',
        distance: 2000,
      },
    };

    const expectedAction = {
      type: UPDATE_TEAM_WORKOUT_SUCCESS,
      payload: response.data,
    };

    expect(updateTeamWorkoutSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action to handle update team workout failure', () => {
    const expectedAction = {
      type: UPDATE_TEAM_WORKOUT_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(updateTeamWorkoutFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: UPDATE_TEAM_WORKOUT_REQUEST,
    };

    expect(updateTeamWorkoutRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle delete team workout success', () => {
    const teamWorkoutId = '1';

    const expectedAction = {
      type: DELETE_TEAM_WORKOUT_SUCCESS,
      payload: '1',
    };

    expect(deleteTeamWorkoutSuccess(teamWorkoutId)).toEqual(expectedAction);
  });

  it('should create an action to handle delete team workout failure', () => {
    const expectedAction = {
      type: DELETE_TEAM_WORKOUT_FAILURE,
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    };

    expect(deleteTeamWorkoutFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle request', () => {
    const expectedAction = {
      type: DELETE_TEAM_WORKOUT_REQUEST,
    };

    expect(deleteTeamWorkoutRequest()).toEqual(expectedAction);
  });
});

describe('async team workout actions', () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  it('handles fetchTeamWorkout success', async () => {
    const teamWorkoutId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/teamworkout/${teamWorkoutId}`, headers).reply(200,
      {
        _id: '1',
        distance: 2000,
      },
    );

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUT_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUT_SUCCESS,
        teamWorkout: {
          _id: '1',
          distance: 2000,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {},
    });

    await store.dispatch(fetchTeamWorkout(teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchTeamWorkout failure', async () => {
    const teamWorkoutId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/teamworkout/${teamWorkoutId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUT_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {},
    });

    await store.dispatch(fetchTeamWorkout(teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchDistResults success', async () => {
    const teamWorkoutId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/results/dist/${teamWorkoutId}`, headers).reply(200,
      [
        {
          _id: '1',
          distance: 2000,
        },
      ],
    );

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
        teamWorkoutResults: [
          {
            _id: '1',
            distance: 2000,
          },
        ],
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        currentResults: null,
      },
    });

    await store.dispatch(fetchDistResults(teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchDistResults failure', async () => {
    const teamWorkoutId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/results/dist/${teamWorkoutId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        currentResults: [],
      },
    });

    await store.dispatch(fetchDistResults(teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchTimeResults success', async () => {
    const teamWorkoutId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/results/time/${teamWorkoutId}`, headers).reply(200,
      [
        {
          _id: '1',
          time: 360,
          timeString: '6:00',
        },
      ],
    );

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
        teamWorkoutResults: [
          {
            _id: '1',
            time: 360,
            timeString: '6:00',
          },
        ],
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        currentResults: null,
      },
    });

    await store.dispatch(fetchTimeResults(teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchTimeResults failure', async () => {
    const teamWorkoutId = '1';
    const headers = { headers: { authorization: 'authtoken' } };

    mockAdapter.onGet(`${ROOT_URL}/results/time/${teamWorkoutId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        currentResults: [],
      },
    });

    await store.dispatch(fetchTimeResults(teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles addTeamWorkout success', async () => {
    const teamId = '10';
    const activity = 'erg';
    const distance = 2000;
    const distUnit = 'm';
    const time = 360;
    const type = 'distance';
    const userId = '1';
    // TODO: figure out why adding the body and headers makes the request not match
    // const info = { userId, teamId, activity, distance, distUnit, time, type };
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPost(`${ROOT_URL}/teamworkouts/add`).reply(200,
      {
        _id: '100',
        activity: 'erg',
        distance: 2000,
        distUnit: 'm',
        time: 360,
        type: 'distance',
      },
    );

    const expectedActions = [
      {
        type: ADD_TEAM_WORKOUT_REQUEST,
      },
      {
        type: ADD_TEAM_WORKOUT_SUCCESS,
        payload: {
          _id: '100',
          activity: 'erg',
          distance: 2000,
          distUnit: 'm',
          time: 360,
          type: 'distance',
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {},
    });

    await store.dispatch(addTeamWorkout({ teamId, activity, distance, distUnit, time, type }, userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles addTeamWorkout failure', async () => {
    const info = {};
    const userId = '1';
    // TODO: figure out why adding the body and headers makes the request not match
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPost(`${ROOT_URL}/teamworkouts/add`).reply(500, error);

    const expectedActions = [
      {
        type: ADD_TEAM_WORKOUT_REQUEST,
      },
      {
        type: ADD_TEAM_WORKOUT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {},
    });

    await store.dispatch(addTeamWorkout(info, userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle fetchTeamWorkouts success', async () => {
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onGet(`${ROOT_URL}/teamworkouts/${userId}`, headers).reply(200,
      [
        {
          _id: '1',
          distance: 2000,
          type: 'distance',
        },
      ],
    );

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUTS_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUTS_SUCCESS,
        teamWorkouts: [
          {
            _id: '1',
            distance: 2000,
            type: 'distance',
          },
        ],
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        list: null,
      },
    });

    await store.dispatch(fetchTeamWorkouts(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle fetchTeamWorkouts failure', async () => {
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onGet(`${ROOT_URL}/teamworkouts/${userId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: FETCH_TEAM_WORKOUTS_REQUEST,
      },
      {
        type: FETCH_TEAM_WORKOUTS_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        list: [],
      },
    });

    await store.dispatch(fetchTeamWorkouts(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle updateTeamWorkout success', async () => {
    const teamWorkoutId = '1';
    const teamWorkout = {
      _id: '10',
      distance: 2000,
      type: 'distance',
    };
    // TODO: figure out why adding the body and headers makes the request not match
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPost(`${ROOT_URL}/teamworkouts/${teamWorkoutId}`).reply(200,
      teamWorkout,
    );

    const expectedActions = [
      {
        type: UPDATE_TEAM_WORKOUT_REQUEST,
      },
      {
        type: UPDATE_TEAM_WORKOUT_SUCCESS,
        payload: {
          _id: '10',
          distance: 2000,
          type: 'distance',
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        list: [],
      },
    });

    await store.dispatch(updateTeamWorkout(teamWorkoutId, teamWorkout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle updateTeamWorkout failure', async () => {
    const teamWorkoutId = '1';
    const teamWorkout = {
      _id: '10',
      distance: 2000,
      type: 'distance',
    };
    // TODO: figure out why adding the body and headers makes the request not match
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPost(`${ROOT_URL}/teamworkouts/${teamWorkoutId}`).reply(500, error);

    const expectedActions = [
      {
        type: UPDATE_TEAM_WORKOUT_REQUEST,
      },
      {
        type: UPDATE_TEAM_WORKOUT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        list: [],
      },
    });

    await store.dispatch(updateTeamWorkout(teamWorkoutId, teamWorkout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle deleteTeamWorkout success', async () => {
    const teamWorkoutId = '1';
    const teamId = '10';

    mockAdapter.onDelete(`${ROOT_URL}/teamworkouts/${teamWorkoutId}/${teamId}`).reply(200,
      teamWorkoutId,
    );

    const expectedActions = [
      {
        type: DELETE_TEAM_WORKOUT_REQUEST,
      },
      {
        type: DELETE_TEAM_WORKOUT_SUCCESS,
        payload: teamWorkoutId,
      },
    ];

    const store = mockStore({
      teamWorkouts: [],
    });

    await store.dispatch(deleteTeamWorkout(teamWorkoutId, teamId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle deleteTeamWorkout failure', async () => {
    const teamWorkoutId = '1';
    const teamId = '10';

    mockAdapter.onDelete(`${ROOT_URL}/teamworkouts/${teamWorkoutId}/${teamId}`).reply(500, error);

    const expectedActions = [
      {
        type: DELETE_TEAM_WORKOUT_REQUEST,
      },
      {
        type: DELETE_TEAM_WORKOUT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: [],
    });

    await store.dispatch(deleteTeamWorkout(teamWorkoutId, teamId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles addResult success', async () => {
    const teamWorkoutId = '1';
    const result = {
      _id: '10',
      activity: 'erg',
      distance: 2000,
      distUnit: 'm',
      time: 360,
    };
    // TODO: figure out why adding the body and headers makes the request not match
    // const info = { userId, teamId, activity, distance, distUnit, time, type };
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPost(`${ROOT_URL}/result/add/${teamWorkoutId}`).reply(200,
      {
        _id: '10',
        activity: 'erg',
        distance: 2000,
        distUnit: 'm',
        time: 360,
      },
    );

    const expectedActions = [
      {
        type: ADD_RESULT_REQUEST,
      },
      {
        type: ADD_RESULT_SUCCESS,
        payload: {
          _id: '10',
          activity: 'erg',
          distance: 2000,
          distUnit: 'm',
          time: 360,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        currentResults: null,
      },
    });

    await store.dispatch(addResult(result, teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles addResult failure', async () => {
    const result = {};
    const teamWorkoutId = '1';
    // TODO: figure out why adding the body and headers makes the request not match
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPost(`${ROOT_URL}/result/add/${teamWorkoutId}`).reply(500, error);

    const expectedActions = [
      {
        type: ADD_RESULT_REQUEST,
      },
      {
        type: ADD_RESULT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {},
    });

    await store.dispatch(addResult(result, teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle updateResult success', async () => {
    const workoutId = '1';
    const workout = {
      _id: '10',
      distance: 2000,
      time: 360,
    };
    // TODO: figure out why adding the body and headers makes the request not match
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPut(`${ROOT_URL}/workouts/${workoutId}`).reply(200,
      workout,
    );

    const expectedActions = [
      {
        type: UPDATE_RESULT_REQUEST,
      },
      {
        type: UPDATE_RESULT_SUCCESS,
        payload: workout,
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        list: [],
      },
    });

    await store.dispatch(updateResult(workoutId, workout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle updateResult failure', async () => {
    const workoutId = '1';
    const workout = {
      _id: '10',
      distance: 2000,
      type: 'distance',
    };
    // TODO: figure out why adding the body and headers makes the request not match
    // const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onPut(`${ROOT_URL}/workouts/${workoutId}`).reply(500, error);

    const expectedActions = [
      {
        type: UPDATE_RESULT_REQUEST,
      },
      {
        type: UPDATE_RESULT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: {
        list: [],
      },
    });

    await store.dispatch(updateResult(workoutId, workout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle deleteResult success', async () => {
    const workoutId = '1';
    const teamWorkoutId = '10';

    mockAdapter.onDelete(`${ROOT_URL}/results/${workoutId}/${teamWorkoutId}`).reply(200);

    const expectedActions = [
      {
        type: DELETE_RESULT_REQUEST,
      },
      {
        type: DELETE_RESULT_SUCCESS,
        payload: workoutId,
      },
    ];

    const store = mockStore({
      teamWorkouts: [],
    });

    await store.dispatch(deleteResult(workoutId, teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle deleteResult failure', async () => {
    const workoutId = '1';
    const teamWorkoutId = '10';

    mockAdapter.onDelete(`${ROOT_URL}/results/${workoutId}/${teamWorkoutId}`).reply(500, error);

    const expectedActions = [
      {
        type: DELETE_RESULT_REQUEST,
      },
      {
        type: DELETE_RESULT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: [],
    });

    await store.dispatch(deleteResult(workoutId, teamWorkoutId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles matchAthlete success', async () => {
    const query = 'Athlete 1';
    const teamId = '10';

    mockAdapter.onGet(`${ROOT_URL}/athletes/${teamId}/${query}`).reply(200,
      [
        {
          _id: '1',
          name: 'Athlete 1',
        },
      ],
    );

    const expectedActions = [
      {
        type: MATCH_ATHLETE_REQUEST,
      },
      {
        type: MATCH_ATHLETE_SUCCESS,
        payload: [
          {
            _id: '1',
            name: 'Athlete 1',
          },
        ],
      },
    ];

    const store = mockStore({
      teamWorkouts: [],
    });

    await store.dispatch(matchAthlete(query, teamId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles matchAthlete failure', async () => {
    const query = 'Athlete 1';
    const teamId = '10';

    mockAdapter.onGet(`${ROOT_URL}/athletes/${teamId}/${query}`).reply(500, error);

    const expectedActions = [
      {
        type: MATCH_ATHLETE_REQUEST,
      },
      {
        type: MATCH_ATHLETE_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      teamWorkouts: [],
    });

    await store.dispatch(matchAthlete(query, teamId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
