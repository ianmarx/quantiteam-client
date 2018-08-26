import { combineReducers } from 'redux';
import AuthReducer from './auth';
import UserReducer from './user';
import WorkoutReducer from './workout';
import TeamReducer from './team';
import TeamWorkoutReducer from './teamworkout';

const appReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  workouts: WorkoutReducer,
  team: TeamReducer,
  teamWorkouts: TeamWorkoutReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DEAUTH_USER') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
