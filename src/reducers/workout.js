import {
  FETCH_WORKOUT,
  FETCH_WORKOUTS,
  FETCH_TEAM_SOLO_WORKOUTS,
  DELETE_WORKOUT,
  ADD_WORKOUT,
  UPDATE_WORKOUT,
} from '../actions/workout';

const initialState = {
  list: [],
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
    case FETCH_TEAM_SOLO_WORKOUTS: {
      return Object.assign({}, state, {
        list: action.payload,
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
