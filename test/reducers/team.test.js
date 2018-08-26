import team from '../../src/reducers/team';
import {
  FETCH_USER_TEAM_SUCCESS,
  FETCH_USER_TEAM_FAILURE,
  FETCH_USER_TEAM_REQUEST,
  CHECK_TEAM_CODE_SUCCESS,
  CHECK_TEAM_CODE_FAILURE,
  CHECK_TEAM_CODE_REQUEST,
  CHECK_TEAM_NAME_SUCCESS,
  CHECK_TEAM_NAME_FAILURE,
  CHECK_TEAM_NAME_REQUEST,
} from '../../src/actions/team';

describe('team reducer', () => {
  it('should return the initial state', () => {
    expect(team(undefined, {})).toEqual({
      team: null,
      isFetchingTeam: false,
      teamIsFetched: false,
      statusText: null,
      teamNameIsAvailable: false,
      teamCodeIsValid: false,
      isCoach: false,
    });
  });

  it('should handle FETCH_USER_TEAM_SUCCESS', () => {
    const teamObject = {
      _id: '1',
      name: 'Team 1',
    };
    const isCoach = true;

    expect(team([], {
      type: FETCH_USER_TEAM_SUCCESS,
      team: teamObject,
      isCoach: isCoach,
    })).toEqual({
      team: teamObject,
      isCoach: isCoach,
      isFetchingTeam: false,
      teamIsFetched: true,
    });
  });

  it('should handle FETCH_USER_TEAM_FAILURE', () => {
    const payload = {
      statusText: 'error',
    };

    expect(team([], {
      type: FETCH_USER_TEAM_FAILURE,
      payload: payload,
    })).toEqual({
      team: null,
      isFetchingTeam: false,
    });
  });

  it('should handle FETCH_USER_TEAM_REQUEST', () => {
    expect(team([], {
      type: FETCH_USER_TEAM_REQUEST,
    })).toEqual({
      isFetchingTeam: true,
      teamIsFetched: false,
    });
  });

  it('should handle CHECK_TEAM_CODE_SUCCESS', () => {
    expect(team([], {
      type: CHECK_TEAM_CODE_SUCCESS,
      payload: null,
    })).toEqual({
      teamCodeIsValid: false,
    });
  });

  it('should handle CHECK_TEAM_CODE_FAILURE', () => {
    const payload = {
      message: 'error message',
    };

    expect(team([], {
      type: CHECK_TEAM_CODE_FAILURE,
      payload: payload,
    })).toEqual({
      statusText: payload.message,
      teamCodeIsValid: false,
    });
  });

  it('should handle CHECK_TEAM_CODE_REQUEST', () => {
    expect(team([], {
      type: CHECK_TEAM_CODE_REQUEST,
    })).toEqual([]);
  });

  it('should handle CHECK_TEAM_NAME_SUCCESS', () => {
    expect(team([], {
      type: CHECK_TEAM_NAME_SUCCESS,
      payload: null,
    })).toEqual({
      teamNameIsAvailable: true,
    });
  });

  it('should handle CHECK_TEAM_NAME_FAILURE', () => {
    const payload = {
      message: 'error message',
    };

    expect(team([], {
      type: CHECK_TEAM_NAME_FAILURE,
      payload: payload,
    })).toEqual({
      statusText: payload.message,
      teamNameIsAvailable: false,
    });
  });

  it('should handle CHECK_TEAM_NAME_REQUEST', () => {
    expect(team([], {
      type: CHECK_TEAM_NAME_REQUEST,
    })).toEqual([]);
  });
});
