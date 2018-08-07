import {
  FETCH_WORKOUT,
  FETCH_WORKOUTS,
  FETCH_TEAM_SOLO_WORKOUTS,
  DELETE_WORKOUT,
} from '../actions/workout';

const initialState = {
  list: [],
  teamList: [],
};

/* Take in the workout and add it to an array of workouts in the redux state */
const WorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKOUT: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    case FETCH_WORKOUTS: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    case FETCH_TEAM_SOLO_WORKOUTS: {
      return Object.assign({}, state, {
        teamList: action.payload,
      });
    }
    case DELETE_WORKOUT: {
      const updatedList = state.list.filter((workout) => {
        return workout._id !== action.payload;
      });
      const updatedTeamList = state.teamList.filter((workout) => {
        return workout._id !== action.payload;
      });
      return Object.assign({}, state, {
        list: updatedList,
        teamList: updatedTeamList,
      });
    }
    default:
      return state;
  }
};

export default WorkoutReducer;
