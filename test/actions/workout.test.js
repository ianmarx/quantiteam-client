import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  FETCH_USER_WORKOUTS_SUCCESS, FETCH_USER_WORKOUTS_FAILURE, FETCH_USER_WORKOUTS_REQUEST,
  DELETE_WORKOUT_SUCCESS, DELETE_WORKOUT_FAILURE, DELETE_WORKOUT_REQUEST,
  FETCH_SOLO_WORKOUTS_SUCCESS, FETCH_SOLO_WORKOUTS_FAILURE, FETCH_SOLO_WORKOUTS_REQUEST,
  ADD_WORKOUT_SUCCESS, ADD_WORKOUT_FAILURE, ADD_WORKOUT_REQUEST,
  UPDATE_WORKOUT_SUCCESS, UPDATE_WORKOUT_FAILURE, UPDATE_WORKOUT_REQUEST,
  fetchUserWorkoutsSuccess, fetchUserWorkoutsFailure, fetchUserWorkoutsRequest, fetchUserWorkouts,
  deleteWorkoutSuccess, deleteWorkoutFailure, deleteWorkoutRequest, deleteWorkout,
  fetchSoloWorkoutsSuccess, fetchSoloWorkoutsFailure, fetchSoloWorkoutsRequest, fetchSoloWorkouts,
  addWorkoutSuccess, addWorkoutFailure, addWorkoutRequest, addWorkout,
  updateWorkoutSuccess, updateWorkoutFailure, updateWorkoutRequest, updateWorkout,
} from '../../src/actions/workout';
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

describe('workout actions', () => {
  it('should create an action to handle fetch user workouts success', () => {
    const userWorkouts = [
      {
        _id: '1',
        distance: 2000,
        timeString: '6:00',
      },
    ];

    const expectedAction = {
      type: FETCH_USER_WORKOUTS_SUCCESS,
      userWorkouts,
    };

    expect(fetchUserWorkoutsSuccess(userWorkouts)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user workouts failure', () => {
    const expectedAction = {
      type: FETCH_USER_WORKOUTS_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(fetchUserWorkoutsFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch user workouts request', () => {
    const expectedAction = {
      type: FETCH_USER_WORKOUTS_REQUEST,
    };

    expect(fetchUserWorkoutsRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle delete workout success', () => {
    const workoutId = '1';

    const expectedAction = {
      type: DELETE_WORKOUT_SUCCESS,
      workoutId,
    };

    expect(deleteWorkoutSuccess(workoutId)).toEqual(expectedAction);
  });

  it('should create an action to handle delete workout failure', () => {
    const expectedAction = {
      type: DELETE_WORKOUT_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(deleteWorkoutFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle delete workout request', () => {
    const expectedAction = {
      type: DELETE_WORKOUT_REQUEST,
    };

    expect(deleteWorkoutRequest()).toEqual(expectedAction);
  });


  it('should create an action to handle fetch solo workouts success', () => {
    const soloWorkouts = [
      {
        _id: '1',
        distance: 2000,
        timeString: '6:00',
      },
    ];

    const expectedAction = {
      type: FETCH_SOLO_WORKOUTS_SUCCESS,
      soloWorkouts,
    };

    expect(fetchSoloWorkoutsSuccess(soloWorkouts)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch solo workouts failure', () => {
    const expectedAction = {
      type: FETCH_SOLO_WORKOUTS_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(fetchSoloWorkoutsFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle fetch solo workouts request', () => {
    const expectedAction = {
      type: FETCH_SOLO_WORKOUTS_REQUEST,
    };

    expect(fetchSoloWorkoutsRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle add workout success', () => {
    const workout = {
      _id: '1',
      distance: 2000,
      timeString: '6:00',
    };

    const expectedAction = {
      type: ADD_WORKOUT_SUCCESS,
      workout,
    };

    expect(addWorkoutSuccess(workout)).toEqual(expectedAction);
  });

  it('should create an action to handle add workout failure', () => {
    const expectedAction = {
      type: ADD_WORKOUT_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(addWorkoutFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle add workout request', () => {
    const expectedAction = {
      type: ADD_WORKOUT_REQUEST,
    };

    expect(addWorkoutRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle update workout success', () => {
    const workout = {
      _id: '1',
      distance: 2000,
      timeString: '6:00',
    };

    const expectedAction = {
      type: UPDATE_WORKOUT_SUCCESS,
      workout,
    };

    expect(updateWorkoutSuccess(workout)).toEqual(expectedAction);
  });

  it('should create an action to handle update workout failure', () => {
    const expectedAction = {
      type: UPDATE_WORKOUT_FAILURE,
      payload: {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      },
    };

    expect(updateWorkoutFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to handle update workout request', () => {
    const expectedAction = {
      type: UPDATE_WORKOUT_REQUEST,
    };

    expect(updateWorkoutRequest()).toEqual(expectedAction);
  });
});

describe('async workout actions', () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  it('handles fetchUserWorkouts success', async () => {
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onGet(`${ROOT_URL}/feed/${userId}`, headers).reply(200,
      [
        {
          _id: '1',
          distance: 2000,
          time: 360,
        },
      ],
    );

    const expectedActions = [
      {
        type: FETCH_USER_WORKOUTS_REQUEST,
      },
      {
        type: FETCH_USER_WORKOUTS_SUCCESS,
        userWorkouts: [
          {
            _id: '1',
            distance: 2000,
            time: 360,
          },
        ],
      },
    ];

    const store = mockStore({
      workouts: {
        userList: [],
      },
    });

    await store.dispatch(fetchUserWorkouts(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchUserWorkouts failure', async () => {
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onGet(`${ROOT_URL}/feed/${userId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: FETCH_USER_WORKOUTS_REQUEST,
      },
      {
        type: FETCH_USER_WORKOUTS_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      workouts: {
        userList: [],
      },
    });

    await store.dispatch(fetchUserWorkouts(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles deleteWorkout success', async () => {
    const workoutId = '10';
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onDelete(`${ROOT_URL}/workouts/${workoutId}/${userId}`, headers).reply(200);

    const expectedActions = [
      {
        type: DELETE_WORKOUT_REQUEST,
      },
      {
        type: DELETE_WORKOUT_SUCCESS,
        workoutId,
      },
    ];

    const store = mockStore({
      workouts: {
        soloList: [],
      },
    });

    await store.dispatch(deleteWorkout(workoutId, userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles deleteWorkout failure', async () => {
    const workoutId = '10';
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onDelete(`${ROOT_URL}/workouts/${workoutId}/${userId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: DELETE_WORKOUT_REQUEST,
      },
      {
        type: DELETE_WORKOUT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      workouts: {
        soloList: [],
      },
    });

    await store.dispatch(deleteWorkout(workoutId, userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles fetchSoloWorkouts success', async () => {
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onGet(`${ROOT_URL}/teamfeed/${userId}`, headers).reply(200,
      [
        {
          _id: '1',
          distance: 2000,
          time: 360,
        },
      ],
    );

    const expectedActions = [
      {
        type: FETCH_SOLO_WORKOUTS_REQUEST,
      },
      {
        type: FETCH_SOLO_WORKOUTS_SUCCESS,
        soloWorkouts: [
          {
            _id: '1',
            distance: 2000,
            time: 360,
          },
        ],
      },
    ];

    const store = mockStore({
      workouts: {
        soloList: [],
      },
    });

    await store.dispatch(fetchSoloWorkouts(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle fetchSoloWorkouts failure', async () => {
    const userId = '1';
    const headers = { headers: { authorization: localStorage.getItem('token') } };

    mockAdapter.onGet(`${ROOT_URL}/teamfeed/${userId}`, headers).reply(500, error);

    const expectedActions = [
      {
        type: FETCH_SOLO_WORKOUTS_REQUEST,
      },
      {
        type: FETCH_SOLO_WORKOUTS_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      workouts: {
        soloList: [],
      },
    });

    await store.dispatch(fetchSoloWorkouts(userId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles addWorkout success', async () => {
    const workout = {
      userId: '1',
      distance: 2000,
      time: 360,
      activity: 'erg',
    };

    mockAdapter.onPost(`${ROOT_URL}/workouts/add`).reply(200,
      workout,
    );

    const expectedActions = [
      {
        type: ADD_WORKOUT_REQUEST,
      },
      {
        type: ADD_WORKOUT_SUCCESS,
        workout,
      },
    ];

    const store = mockStore({
      workouts: {
        userList: [],
      },
    });

    await store.dispatch(addWorkout(workout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles addWorkout failure', async () => {
    const workout = {
      userId: '1',
      distance: 2000,
      time: 360,
      activity: 'erg',
    };

    mockAdapter.onPost(`${ROOT_URL}/workouts/add`).reply(500, error);

    const expectedActions = [
      {
        type: ADD_WORKOUT_REQUEST,
      },
      {
        type: ADD_WORKOUT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      workouts: {
        userList: [],
      },
    });

    await store.dispatch(addWorkout(workout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles updateWorkout success', async () => {
    const workoutId = '1';
    const workout = {
      _id: '1',
      distance: 2000,
      time: 360,
      activity: 'erg',
    };

    mockAdapter.onPut(`${ROOT_URL}/workouts/${workoutId}`).reply(200,
      workout,
    );

    const expectedActions = [
      {
        type: UPDATE_WORKOUT_REQUEST,
      },
      {
        type: UPDATE_WORKOUT_SUCCESS,
        workout,
      },
    ];

    const store = mockStore({
      workouts: {
        userList: [],
      },
    });

    await store.dispatch(updateWorkout(workoutId, workout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles updateWorkout failure', async () => {
    const workoutId = '1';
    const workout = {
      _id: '1',
      distance: 2000,
      time: 360,
      activity: 'erg',
    };

    mockAdapter.onPut(`${ROOT_URL}/workouts/${workoutId}`).reply(500, error);

    const expectedActions = [
      {
        type: UPDATE_WORKOUT_REQUEST,
      },
      {
        type: UPDATE_WORKOUT_FAILURE,
        payload: {
          message: error.message,
          status: error.response.status,
        },
      },
    ];

    const store = mockStore({
      workouts: {
        userList: [],
      },
    });

    await store.dispatch(updateWorkout(workoutId, workout));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
