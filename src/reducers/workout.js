import {
  FETCH_WORKOUT,
  FETCH_WORKOUTS,
  FETCH_USER_WORKOUTS_SUCCESS,
  FETCH_USER_WORKOUTS_FAILURE,
  FETCH_USER_WORKOUTS_REQUEST,
  FETCH_SOLO_WORKOUTS_SUCCESS,
  FETCH_SOLO_WORKOUTS_FAILURE,
  FETCH_SOLO_WORKOUTS_REQUEST,
  DELETE_WORKOUT,
  ADD_WORKOUT,
  UPDATE_WORKOUT,
} from '../actions/workout';

const initialState = {
  list: [],
  isFetchingSoloWorkouts: false,
  isFetchingUserWorkouts: false,
};

/* Take in the workout and add it to an array of workouts in the redux state */
const WorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKOUT: {
      return state;
    }
    case FETCH_WORKOUTS: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    case FETCH_SOLO_WORKOUTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: false,
        list: action.soloWorkouts,
      });
    }
    case FETCH_SOLO_WORKOUTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: false,
        list: {},
      });
    }
    case FETCH_SOLO_WORKOUTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: true,
        list: {},
      });
    }
    case FETCH_USER_WORKOUTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: false,
        list: action.userWorkouts,
      });
    }
    case FETCH_USER_WORKOUTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: false,
        list: {},
      });
    }
    case FETCH_USER_WORKOUTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: true,
        list: {},
      });
    }
    case DELETE_WORKOUT: {
      const updatedList = state.list.filter((workout) => {
        return workout._id !== action.payload;
      });
      return Object.assign({}, state, {
        list: updatedList,
      });
    }
    case ADD_WORKOUT: {
      const newWorkoutList = state.list;
      newWorkoutList.unshift(action.payload);
      return Object.assign({}, state, {
        list: newWorkoutList,
      });
    }
    case UPDATE_WORKOUT: {
      const newWorkouts = [];
      Object.assign(newWorkouts, state.list);
      const oldWorkoutIndex = newWorkouts.findIndex((workout) => {
        return workout._id === action.payload._id;
      });

      newWorkouts[oldWorkoutIndex] = action.payload;

      return Object.assign({}, state, {
        list: newWorkouts,
      });
    }
    default:
      return state;
  }
};

export default WorkoutReducer;
