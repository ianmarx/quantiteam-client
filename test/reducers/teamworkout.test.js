import teamworkout from '../../src/reducers/teamworkout';
import {
  FETCH_TEAM_WORKOUT_SUCCESS,
  FETCH_TEAM_WORKOUT_FAILURE,
  FETCH_TEAM_WORKOUT_REQUEST,
  FETCH_TEAM_WORKOUTS_SUCCESS,
  FETCH_TEAM_WORKOUTS_FAILURE,
  FETCH_TEAM_WORKOUTS_REQUEST,
  FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
  FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
  FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
  UPDATE_TEAM_WORKOUT_SUCCESS,
  DELETE_TEAM_WORKOUT_SUCCESS,
  DELETE_RESULT_SUCCESS,
  ADD_RESULT_SUCCESS,
  UPDATE_RESULT_SUCCESS,
  ADD_TEAM_WORKOUT_SUCCESS,
} from '../../src/actions/teamworkout';

describe('team workout reducer', () => {
  it('should return initial state', () => {
    expect(teamworkout(undefined, {})).toEqual({
      list: null,
      currentTeamWorkout: null,
      currentResults: null,
      isFetchingTeamWorkout: false,
      isFetchingTeamWorkouts: false,
      teamWorkoutsFetched: false,
      isFetchingResults: false,
    });
  });

  it('should handle ADD_TEAM_WORKOUT_SUCCESS', () => {
    const workoutObject = {
      _id: '1',
      distance: 2000,
      type: 'distance',
    };

    expect(teamworkout([], {
      type: ADD_TEAM_WORKOUT_SUCCESS,
      payload: workoutObject,
    })).toEqual({
      list: [workoutObject],
    });
  });

  it('should handle FETCH_TEAM_WORKOUT_SUCCESS', () => {
    const teamWorkout = {
      _id: '1',
      distance: 2000,
      time: 360,
    };

    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUT_SUCCESS,
      teamWorkout: teamWorkout,
    })).toEqual({
      isFetchingTeamWorkout: false,
      currentTeamWorkout: teamWorkout,
    });
  });

  it('should handle FETCH_TEAM_WORKOUT_FAILURE', () => {
    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUT_FAILURE,
    })).toEqual({
      isFetchingTeamWorkout: false,
      currentTeamWorkout: null,
    });
  });

  it('should handle FETCH_TEAM_WORKOUT_REQUEST', () => {
    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUT_REQUEST,
    })).toEqual({
      isFetchingTeamWorkout: true,
      currentTeamWorkout: null,
    });
  });

  it('should handle FETCH_TEAM_WORKOUTS_SUCCESS', () => {
    const teamWorkouts = [
      {
        _id: '1',
        distance: 2000,
        type: 'distance',
      },
    ];

    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUTS_SUCCESS,
      teamWorkouts: teamWorkouts,
    })).toEqual({
      isFetchingTeamWorkouts: false,
      teamWorkoutsFetched: true,
      list: teamWorkouts,
    });
  });

  it('should handle FETCH_TEAM_WORKOUTS_FAILURE', () => {
    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUTS_FAILURE,
    })).toEqual({
      isFetchingTeamWorkouts: false,
      list: null,
    });
  });

  it('should handle FETCH_TEAM_WORKOUTS_REQUEST', () => {
    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUTS_REQUEST,
    })).toEqual({
      isFetchingTeamWorkouts: true,
      teamWorkoutsFetched: false,
      list: {},
    });
  });

  it('should handle FETCH_TEAM_WORKOUT_RESULTS_SUCCESS', () => {
    const teamWorkoutResults = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
      {
        _id: '2',
        distance: 2000,
        time: 370,
      },
    ];

    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
      teamWorkoutResults: teamWorkoutResults,
    })).toEqual({
      isFetchingResults: false,
      currentResults: teamWorkoutResults,
    });
  });

  it('should handle FETCH_TEAM_WORKOUT_RESULTS_FAILURE', () => {
    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
    })).toEqual({
      isFetchingResults: false,
      currentResults: null,
    });
  });

  it('should handle FETCH_TEAM_WORKOUT_RESULTS_REQUEST', () => {
    expect(teamworkout([], {
      type: FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
    })).toEqual({
      isFetchingResults: true,
      currentResults: null,
    });
  });

  it('should handle UPDATE_TEAM_WORKOUT_SUCCESS', () => {
    const teamWorkoutList = [
      {
        _id: '1',
        distance: 2000,
        type: 'distance',
      },
    ];

    const newTeamWorkoutList = [
      {
        _id: '1',
        distance: 5000,
        type: 'distance',
      },
    ];

    expect(teamworkout({
      list: teamWorkoutList,
    }, {
      type: UPDATE_TEAM_WORKOUT_SUCCESS,
      payload: {
        _id: '1',
        distance: 5000,
        type: 'distance',
      },
    })).toEqual({
      list: newTeamWorkoutList,
    });
  });

  it('should handle DELETE_TEAM_WORKOUT_SUCCESS', () => {
    const teamWorkoutList = [
      {
        _id: '1',
        distance: 2000,
        type: 'distance',
      },
    ];

    expect(teamworkout({
      list: teamWorkoutList,
    }, {
      type: DELETE_TEAM_WORKOUT_SUCCESS,
      payload: '1',
    })).toEqual({
      list: [],
    });
  });

  it('should handle DELETE_RESULT_SUCCESS', () => {
    const currentResults = [
      {
        _id: '1',
        distance: 2000,
        time: 360,
      },
    ];

    expect(teamworkout({
      currentResults: currentResults,
    }, {
      type: DELETE_RESULT_SUCCESS,
      payload: '1',
    })).toEqual({
      currentResults: [],
    });
  });

  it('should handle ADD_RESULT_SUCCESS', () => {
    expect(teamworkout({}, {
      type: ADD_RESULT_SUCCESS,
    })).toEqual({});
  });

  it('should handle UPDATE_RESULT_SUCCESS', () => {
    const workoutObject = {
      _id: '1',
      distance: 2000,
      time: 360,
    };

    expect(teamworkout({
      currentResults: [
        workoutObject,
      ],
    }, {
      type: UPDATE_RESULT_SUCCESS,
      payload: {
        _id: '1',
        distance: 2000,
        time: 370,
      },
    })).toEqual({
      currentResults: [
        {
          _id: '1',
          distance: 2000,
          time: 370,
        },
      ],
    });
  });
});
