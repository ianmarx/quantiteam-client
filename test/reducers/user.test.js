import user from '../../src/reducers/user';
import {
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
} from '../../src/actions/user';
import {
  MATCH_ATHLETE_SUCCESS,
  MATCH_ATHLETE_FAILURE,
  MATCH_ATHLETE_REQUEST,
} from '../../src/actions/teamworkout';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, {
      type: 'default',
    })).toEqual({
      userProfile: null,
      queryResults: null,
      isFetchingUserProfile: false,
      userProfileIsFetched: false,
      isUpdatingUserProfile: false,
      userProfileIsUpdated: false,
      statusText: null,
    });
  });

  it('should handle FETCH_USER_PROFILE_SUCCESS', () => {
    const userProfile = {
      _id: '1',
      name: 'Athlete 1',
    };

    expect(user([], {
      type: FETCH_USER_PROFILE_SUCCESS,
      userProfile: userProfile,
    })).toEqual({
      isFetchingUserProfile: false,
      userProfileIsFetched: true,
      userProfile: userProfile,
    });
  });

  it('should handle FETCH_USER_PROFILE_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(user([], {
      type: FETCH_USER_PROFILE_FAILURE,
      payload: payload,
    })).toEqual({
      isFetchingUserProfile: false,
      userProfile: null,
      statusText: payload.statusText,
    });
  });

  it('should handle FETCH_USER_PROFILE_REQUEST', () => {
    expect(user([], {
      type: FETCH_USER_PROFILE_REQUEST,
    })).toEqual({
      isFetchingUserProfile: true,
      userProfileIsFetched: false,
      userProfile: null,
    });
  });

  it('should handle UPDATE_USER_PROFILE_SUCCESS', () => {
    const userProfile = {
      _id: '1',
      name: 'Athlete 1',
    };

    expect(user([], {
      type: UPDATE_USER_PROFILE_SUCCESS,
      userProfile: userProfile,
    })).toEqual({
      isUpdatingUserProfile: false,
      userProfileIsUpdated: true,
      userProfile: userProfile,
    });
  });

  it('should handle UPDATE_USER_PROFILE_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(user([], {
      type: UPDATE_USER_PROFILE_FAILURE,
      payload: payload,
    })).toEqual({
      isUpdatingUserProfile: false,
      userProfileIsUpdated: false,
      statusText: payload.statusText,
    });
  });

  it('should handle UPDATE_USER_PROFILE_REQUEST', () => {
    expect(user([], {
      type: UPDATE_USER_PROFILE_REQUEST,
    })).toEqual({
      isUpdatingUserProfile: true,
      userProfileIsUpdated: false,
    });
  });

  it('should handle MATCH_ATHLETE_SUCCESS', () => {
    const queryResults = [
      {
        _id: '1',
        name: 'Athlete 1',
      },
    ];

    expect(user([], {
      type: MATCH_ATHLETE_SUCCESS,
      payload: queryResults,
    })).toEqual({
      queryResults: queryResults,
    });
  });

  it('should handle MATCH_ATHLETE_FAILURE', () => {
    expect(user([], {
      type: MATCH_ATHLETE_FAILURE,
    })).toEqual({
      queryResults: null,
    });
  });

  it('should handle MATCH_ATHLETE_REQUEST', () => {
    expect(user({}, {
      type: MATCH_ATHLETE_REQUEST,
    })).toEqual({});
  });
});
