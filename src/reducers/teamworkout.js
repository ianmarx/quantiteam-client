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
} from '../actions/teamworkout';

import sortTeamWorkoutResults from '../utils/results';

const initialState = {
  list: null,
  currentTeamWorkout: null,
  currentResults: null,
  isFetchingTeamWorkout: false,
  isFetchingTeamWorkouts: false,
  teamWorkoutsFetched: false,
  isFetchingResults: false,
};

const TeamWorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM_WORKOUT_SUCCESS: {
      const newTeamWorkoutList = [];
      Object.assign(newTeamWorkoutList, state.list);
      newTeamWorkoutList.unshift(action.payload);
      return Object.assign({}, state, {
        list: newTeamWorkoutList,
      });
    }
    case FETCH_TEAM_WORKOUT_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingTeamWorkout: false,
        currentTeamWorkout: action.teamWorkout,
      });
    }
    case FETCH_TEAM_WORKOUT_FAILURE: {
      return Object.assign({}, state, {
        isFetchingTeamWorkout: false,
        currentTeamWorkout: null,
      });
    }
    case FETCH_TEAM_WORKOUT_REQUEST: {
      return Object.assign({}, state, {
        isFetchingTeamWorkout: true,
        currentTeamWorkout: null,
      });
    }
    case FETCH_TEAM_WORKOUTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingTeamWorkouts: false,
        teamWorkoutsFetched: true,
        list: action.teamWorkouts,
      });
    }
    case FETCH_TEAM_WORKOUTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingTeamWorkouts: false,
        list: null,
      });
    }
    case FETCH_TEAM_WORKOUTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingTeamWorkouts: true,
        teamWorkoutsFetched: false,
        list: {},
      });
    }
    case FETCH_TEAM_WORKOUT_RESULTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingResults: false,
        currentResults: action.teamWorkoutResults,
      });
    }
    case FETCH_TEAM_WORKOUT_RESULTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingResults: false,
        currentResults: null,
      });
    }
    case FETCH_TEAM_WORKOUT_RESULTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingResults: true,
        currentResults: null,
      });
    }
    case UPDATE_TEAM_WORKOUT_SUCCESS: {
      const newTeamWorkouts = [];
      Object.assign(newTeamWorkouts, state.list);
      const oldTeamWorkoutIndex = newTeamWorkouts.findIndex((teamWorkout) => {
        return teamWorkout._id === action.payload._id;
      });

      newTeamWorkouts[oldTeamWorkoutIndex] = action.payload;

      return Object.assign({}, state, {
        list: newTeamWorkouts,
      });
    }
    case DELETE_TEAM_WORKOUT_SUCCESS: {
      const oldTeamWorkouts = state.list;
      const updatedTeamWorkouts = oldTeamWorkouts.filter((teamWorkout) => {
        return teamWorkout._id !== action.payload;
      });
      return Object.assign({}, state, {
        list: updatedTeamWorkouts,
      });
    }
    case DELETE_RESULT_SUCCESS: {
      const updatedResults = state.currentResults.filter((result) => {
        return result._id !== action.payload;
      });
      return Object.assign({}, state, {
        currentResults: updatedResults,
      });
    }
    case ADD_RESULT_SUCCESS: {
      return state;
    }
    case UPDATE_RESULT_SUCCESS: {
      const newResults = [];
      Object.assign(newResults, state.currentResults);
      const oldResultIndex = newResults.findIndex((result) => {
        return result._id === action.payload._id;
      });

      newResults[oldResultIndex] = action.payload;

      const sortedResults = sortTeamWorkoutResults(newResults, action.payload.resultType);

      return Object.assign({}, state, {
        currentResults: sortedResults,
      });
    }
    default:
      return state;
  }
};

export default TeamWorkoutReducer;
