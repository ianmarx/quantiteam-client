import {
  FETCH_TEAM_WORKOUTS,
  FETCH_TEAM_WORKOUT_SUCCESS,
  FETCH_TEAM_WORKOUT_FAILURE,
  FETCH_TEAM_WORKOUT_REQUEST,
  FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
  FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
  FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
  UPDATE_TEAM_WORKOUT,
  DELETE_TEAM_WORKOUT,
  DELETE_RESULT,
  ADD_RESULT,
  UPDATE_RESULT,
  ADD_TEAM_WORKOUT,
} from '../actions/teamworkout';

import sortTeamWorkoutResults from '../utils/results';

const initialState = {
  list: [],
  currentTeamWorkout: {},
  currentResults: [],
  isFetchingTeamWorkout: false,
  isFetchingResults: false,
};

const TeamWorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM_WORKOUT: {
      const newTeamWorkoutList = [];
      Object.assign(newTeamWorkoutList, state.list);
      newTeamWorkoutList.unshift(action.payload);
      return Object.assign({}, state, {
        list: newTeamWorkoutList,
      });
    }
    case FETCH_TEAM_WORKOUTS: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    case FETCH_TEAM_WORKOUT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        currentTeamWorkout: action.teamWorkout,
      });
    }
    case FETCH_TEAM_WORKOUT_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        currentTeamWorkout: {},
      });
    }
    case FETCH_TEAM_WORKOUT_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        currentTeamWorkout: {},
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
        currentResults: [],
      });
    }
    case FETCH_TEAM_WORKOUT_RESULTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingResults: true,
        currentResults: [],
      });
    }
    case UPDATE_TEAM_WORKOUT: {
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
    case DELETE_TEAM_WORKOUT: {
      const updatedTeamWorkouts = state.list.filter((teamWorkout) => {
        return teamWorkout._id !== action.payload;
      });
      return Object.assign({}, state, {
        list: updatedTeamWorkouts,
      });
    }
    case DELETE_RESULT: {
      const updatedResults = state.currentResults.filter((result) => {
        return result._id !== action.payload;
      });
      return Object.assign({}, state, {
        currentResults: updatedResults,
      });
    }
    case ADD_RESULT: {
      return state;
    }
    case UPDATE_RESULT: {
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
