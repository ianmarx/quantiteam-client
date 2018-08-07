import {
  FETCH_TEAM_WORKOUTS,
  FETCH_TEAM_WORKOUT_SUCCESS,
  FETCH_TEAM_WORKOUT_FAILURE,
  FETCH_TEAM_WORKOUT_REQUEST,
  FETCH_TEAM_WORKOUT_RESULTS_SUCCESS,
  FETCH_TEAM_WORKOUT_RESULTS_FAILURE,
  FETCH_TEAM_WORKOUT_RESULTS_REQUEST,
  DELETE_TEAM_WORKOUT,
  DELETE_RESULT,
} from '../actions/teamworkout';

const initialState = {
  list: [],
  currentTeamWorkout: {},
  currentResults: [],
  isFetchingTeamWorkout: false,
  isFetchingResults: false,
};

const TeamWorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default TeamWorkoutReducer;
