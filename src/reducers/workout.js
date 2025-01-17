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
};

/* Take in the workout and add it to an array of workouts in the redux state */
const WorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOLO_WORKOUTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: false,
        soloWorkoutsFetched: true,
        soloList: action.soloWorkouts,
        statusText: null,
      });
    }
    case FETCH_SOLO_WORKOUTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: false,
        soloList: {},
        statusText: action.payload.statusText,
      });
    }
    case FETCH_SOLO_WORKOUTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingSoloWorkouts: true,
        soloWorkoutsFetched: false,
        soloList: {},
      });
    }
    case FETCH_USER_WORKOUTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: false,
        userWorkoutsFetched: true,
        userList: action.userWorkouts,
        statusText: null,
      });
    }
    case FETCH_USER_WORKOUTS_FAILURE: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: false,
        userList: {},
        statusText: action.payload.statusText,
      });
    }
    case FETCH_USER_WORKOUTS_REQUEST: {
      return Object.assign({}, state, {
        isFetchingUserWorkouts: true,
        userWorkoutsFetched: false,
        userList: {},
      });
    }
    case DELETE_WORKOUT_SUCCESS: {
      const updatedSoloList = state.soloList ? state.soloList.filter((workout) => {
        return workout._id !== action.workoutId;
      }) : null;
      const updatedUserList = state.userList ? state.userList.filter((workout) => {
        return workout._id !== action.workoutId;
      }) : null;
      return Object.assign({}, state, {
        isDeletingWorkout: false,
        workoutIsDeleted: true,
        soloList: updatedSoloList,
        userList: updatedUserList,
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
      const newSoloWorkoutList = state.soloList;
      if (newSoloWorkoutList !== null) {
        newSoloWorkoutList.unshift(action.workout);
      }

      const newUserWorkoutList = state.userList;
      if (newUserWorkoutList !== null) {
        newUserWorkoutList.unshift(action.workout);
      }

      return Object.assign({}, state, {
        isAddingWorkout: false,
        workoutIsAdded: true,
        soloList: newSoloWorkoutList,
        userList: newUserWorkoutList,
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
      const newSoloWorkouts = state.soloList;
      if (newSoloWorkouts !== null) {
        const oldSoloWorkoutIndex = newSoloWorkouts.findIndex((workout) => {
          return workout._id === action.workout._id;
        });
        newSoloWorkouts[oldSoloWorkoutIndex] = action.workout;
      }

      const newUserWorkouts = state.userList;
      if (newUserWorkouts !== null) {
        const oldUserWorkoutIndex = newUserWorkouts.findIndex((workout) => {
          return workout._id === action.workout._id;
        });
        newUserWorkouts[oldUserWorkoutIndex] = action.workout;
      }

      return Object.assign({}, state, {
        isUpdatingWorkout: false,
        workoutIsUpdated: true,
        soloList: newSoloWorkouts,
        userList: newUserWorkouts,
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
