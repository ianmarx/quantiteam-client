import workout from '../../src/reducers/workout';
import {
  FETCH_USER_WORKOUTS_SUCCESS,
  FETCH_USER_WORKOUTS_FAILURE,
  FETCH_USER_WORKOUTS_REQUEST,
  FETCH_SOLO_WORKOUTS_SUCCESS,
  FETCH_SOLO_WORKOUTS_FAILURE,
  FETCH_SOLO_WORKOUTS_REQUEST,
  DELETE_WORKOUT_SUCCESS,
  DELETE_WORKOUT_FAILURE,
  DELETE_WORKOUT_REQUEST,
  ADD_WORKOUT_SUCCESS,
  ADD_WORKOUT_FAILURE,
  ADD_WORKOUT_REQUEST,
  UPDATE_WORKOUT_SUCCESS,
  UPDATE_WORKOUT_FAILURE,
  UPDATE_WORKOUT_REQUEST,
} from '../../src/actions/workout';

describe('workout reducer', () => {
  it('should return the initial state', () => {
    expect(workout(undefined, {})).toEqual({
      soloList: null,
      userList: null,
      isFetchingSoloWorkouts: false,
      soloWorkoutsFetched: false,
      isFetchingUserWorkouts: false,
      userWorkoutsFetched: false,
      isDeletingWorkout: false,
      workoutIsDeleted: false,
      isAddingWorkout: false,
      workoutIsAdded: false,
      isUpdatingWorkout: false,
      workoutIsUpdated: false,
      statusText: null,
    });
  });

  it('should handle FETCH_USER_WORKOUTS_SUCCESS', () => {
    const userWorkouts = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
    ];

    expect(workout([], {
      type: FETCH_USER_WORKOUTS_SUCCESS,
      userWorkouts: userWorkouts,
    })).toEqual({
      isFetchingUserWorkouts: false,
      userWorkoutsFetched: true,
      userList: userWorkouts,
      statusText: null,
    });
  });

  it('should handle FETCH_USER_WORKOUTS_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(workout([], {
      type: FETCH_USER_WORKOUTS_FAILURE,
      payload: payload,
    })).toEqual({
      isFetchingUserWorkouts: false,
      userList: {},
      statusText: payload.statusText,
    });
  });

  it('should handle FETCH_USER_WORKOUTS_REQUEST', () => {
    expect(workout([], {
      type: FETCH_USER_WORKOUTS_REQUEST,
    })).toEqual({
      isFetchingUserWorkouts: true,
      userWorkoutsFetched: false,
      userList: {},
    });
  });

  it('should handle FETCH_SOLO_WORKOUTS_SUCCESS', () => {
    const soloWorkouts = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
    ];

    expect(workout([], {
      type: FETCH_SOLO_WORKOUTS_SUCCESS,
      soloWorkouts: soloWorkouts,
    })).toEqual({
      isFetchingSoloWorkouts: false,
      soloWorkoutsFetched: true,
      soloList: soloWorkouts,
      statusText: null,
    });
  });

  it('should handle FETCH_SOLO_WORKOUTS_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(workout([], {
      type: FETCH_SOLO_WORKOUTS_FAILURE,
      payload: payload,
    })).toEqual({
      isFetchingSoloWorkouts: false,
      soloList: {},
      statusText: payload.statusText,
    });
  });

  it('should handle FETCH_SOLO_WORKOUTS_REQUEST', () => {
    expect(workout([], {
      type: FETCH_SOLO_WORKOUTS_REQUEST,
    })).toEqual({
      isFetchingSoloWorkouts: true,
      soloWorkoutsFetched: false,
      soloList: {},
    });
  });

  it('should handle DELETE_WORKOUT_SUCCESS', () => {
    const soloList = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
    ];

    const userList = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
    ];

    expect(workout({
      soloList: soloList,
      userList: userList,
    }, {
      type: DELETE_WORKOUT_SUCCESS,
      workoutId: '1',
    })).toEqual({
      isDeletingWorkout: false,
      workoutIsDeleted: true,
      soloList: [],
      userList: [],
      statusText: null,
    });

    expect(workout([], {
      type: DELETE_WORKOUT_SUCCESS,
    })).toEqual({
      isDeletingWorkout: false,
      workoutIsDeleted: true,
      soloList: null,
      userList: null,
      statusText: null,
    });
  });

  it('should handle DELETE_WORKOUT_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(workout([], {
      type: DELETE_WORKOUT_FAILURE,
      payload: payload,
    })).toEqual({
      isDeletingWorkout: false,
      workoutIsDeleted: false,
      statusText: payload.statusText,
    });
  });

  it('should handle DELETE_WORKOUT_REQUEST', () => {
    expect(workout([], {
      type: DELETE_WORKOUT_REQUEST,
    })).toEqual({
      isDeletingWorkout: true,
      workoutIsDeleted: false,
      statusText: 'Deleting workout...',
    });
  });

  it('should handle ADD_WORKOUT_SUCCESS', () => {
    const workoutObject = {
      _id: '1',
      distance: 2000,
      time: 360,
    };

    const soloList = [
      workoutObject,
    ];

    const userList = [
      workoutObject,
    ];

    expect(workout({
      soloList: [],
      userList: [],
    }, {
      type: ADD_WORKOUT_SUCCESS,
      workout: workoutObject,
    })).toEqual({
      isAddingWorkout: false,
      workoutIsAdded: true,
      soloList: soloList,
      userList: userList,
      statusText: null,
    });
  });

  it('should handle ADD_WORKOUT_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(workout([], {
      type: ADD_WORKOUT_FAILURE,
      payload: payload,
    })).toEqual({
      isAddingWorkout: false,
      workoutIsAdded: false,
      statusText: payload.statusText,
    });
  });

  it('should handle ADD_WORKOUT_REQUEST', () => {
    expect(workout([], {
      type: ADD_WORKOUT_REQUEST,
    })).toEqual({
      isAddingWorkout: true,
      workoutIsAdded: false,
      statusText: 'Adding workout...',
    });
  });

  it('should handle UPDATE_WORKOUT_SUCCESS', () => {
    const soloList = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
    ];

    const userList = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
    ];

    const newSoloList = [
      {
        _id: '1',
        distance: 2000,
        time: 370,
      },
    ];

    const newUserList = [
      {
        _id: '1',
        distance: 2000,
        time: 370,
      },
    ];


    expect(workout({
      soloList: soloList,
      userList: userList,
    }, {
      type: UPDATE_WORKOUT_SUCCESS,
      workout: {
        _id: '1',
        distance: 2000,
        time: 370,
      },
    })).toEqual({
      isUpdatingWorkout: false,
      workoutIsUpdated: true,
      soloList: newSoloList,
      userList: newUserList,
      statusText: null,
    });
  });

  it('should handle UPDATE_WORKOUT_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(workout([], {
      type: UPDATE_WORKOUT_FAILURE,
      payload: payload,
    })).toEqual({
      isUpdatingWorkout: false,
      workoutIsUpdated: false,
      statusText: payload.statusText,
    });
  });

  it('should handle UPDATE_WORKOUT_REQUEST', () => {
    expect(workout([], {
      type: UPDATE_WORKOUT_REQUEST,
    })).toEqual({
      isUpdatingWorkout: true,
      workoutIsUpdated: false,
      statusText: 'Updating workout...',
    });
  });
});
