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
} from '../actions/workout';

const initialState = {
  list: [],
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
};

/* Take in the workout and add it to an array of workouts in the redux state */
const WorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOLO_WORKOUTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: false,
        soloWorkoutsFetched: true,
        list: action.soloWorkouts,
        statusText: null,
      });
    }
    case FETCH_SOLO_WORKOUTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: false,
        list: {},
        statusText: action.payload.statusText,
      });
    }
    case FETCH_SOLO_WORKOUTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: true,
        soloWorkoutsFetched: false,
        list: {},
      });
    }
    case FETCH_USER_WORKOUTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: false,
        userWorkoutsFetched: true,
        list: action.userWorkouts,
        statusText: null,
      });
    }
    case FETCH_USER_WORKOUTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: false,
        list: {},
        statusText: action.payload.statusText,
      });
    }
    case FETCH_USER_WORKOUTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: true,
        userWorkoutsFetched: false,
        list: {},
      });
    }
    case DELETE_WORKOUT_SUCCESS: {
      const updatedList = state.list.filter((workout) => {
        return workout._id !== action.workoutId;
      });
      return Object.assign({}, state, {
        isDeletingWorkout: false,
        workoutIsDeleted: true,
        list: updatedList,
        statusText: null,
      });
    }
    case DELETE_WORKOUT_FAILURE: {
      return Object.assign({}, state, {
        isDeletingWorkout: false,
        workoutIsDeleted: false,
        statusText: action.payload.statusText,
      });
    }
    case DELETE_WORKOUT_REQUEST: {
      return Object.assign({}, state, {
        isDeletingWorkout: true,
        workoutIsDeleted: false,
        statusText: 'Deleting workout...',
      });
    }
    case ADD_WORKOUT_SUCCESS: {
      const newWorkoutList = state.list;
      newWorkoutList.unshift(action.workout);
      return Object.assign({}, state, {
        isAddingWorkout: false,
        workoutIsAdded: true,
        list: newWorkoutList,
        statusText: null,
      });
    }
    case ADD_WORKOUT_FAILURE: {
      return Object.assign({}, state, {
        isAddingWorkout: false,
        workoutIsAdded: false,
        statusText: action.payload.statusText,
      });
    }
    case ADD_WORKOUT_REQUEST: {
      return Object.assign({}, state, {
        isAddingWorkout: true,
        workoutIsAdded: false,
        statusText: 'Adding workout...',
      });
    }
    case UPDATE_WORKOUT_SUCCESS: {
      const newWorkouts = [];
      Object.assign(newWorkouts, state.list);
      const oldWorkoutIndex = newWorkouts.findIndex((workout) => {
        return workout._id === action.workout._id;
      });

      newWorkouts[oldWorkoutIndex] = action.workout;

      return Object.assign({}, state, {
        isUpdatingWorkout: false,
        workoutIsUpdated: true,
        list: newWorkouts,
        statusText: null,
      });
    }
    case UPDATE_WORKOUT_FAILURE: {
      return Object.assign({}, state, {
        isUpdatingWorkout: false,
        workoutIsUpdated: false,
        statusText: action.payload.statusText,
      });
    }
    case UPDATE_WORKOUT_REQUEST: {
      return Object.assign({}, state, {
        isUpdatingWorkout: true,
        workoutIsUpdated: false,
        statusText: 'Updating workout...',
      });
    }
    default:
      return state;
  }
};

export default WorkoutReducer;
