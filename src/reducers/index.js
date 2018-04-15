import { combineReducers } from 'redux';
import AuthReducer from './auth';
import UserReducer from './user';
import WorkoutReducer from './workout';
import TeamReducer from './team';
import TeamWorkoutReducer from './teamworkout';

const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: UserReducer,
  workouts: WorkoutReducer,
  team: TeamReducer,
  teamWorkouts: TeamWorkoutReducer,
});

export default rootReducer;
