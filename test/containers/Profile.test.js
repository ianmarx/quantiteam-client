import React from 'react';
import { shallow } from 'enzyme';
import { Profile, mapStateToProps } from '../../src/containers/Profile';

const match = { params: { userId: '1' } };

const userId = '1';

const user = {
  _id: '1',
};

const userProfile = {
  _id: '1',
  name: 'Athlete 1',
  _team: '1',
  weight: 200,
};

const team = {
  _id: '1',
  name: 'Team 1',
};

const userWorkouts = [
  {
    distance: 2000,
    timeString: '6:00',
  },
];

describe('<Profile />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<Profile
      match={match}
      userId={userId}
      user={user}
      userProfile={userProfile}
      team={team}
      userWorkouts={userWorkouts}
      fetchUserProfile={jest.fn()}
      fetchUserTeam={jest.fn()}
      fetchUserWorkouts={jest.fn()}
      userProfileIsFetched
      userWorkoutsFetched
      teamIsFetched
      isAuthenticated
    />);

    expect(wrapper.find('.profile-page').length).toBe(1);
    expect(wrapper.find('.workout-feed-container').length).toBe(1);
    expect(wrapper.find('.modal').length).toBe(1);
  });

  it('should show loading screen when !userProfileIsFetched', () => {
    const wrapper = shallow(<Profile
      match={match}
      userId={userId}
      user={user}
      userProfile={userProfile}
      team={team}
      userWorkouts={userWorkouts}
      fetchUserProfile={jest.fn()}
      fetchUserTeam={jest.fn()}
      fetchUserWorkouts={jest.fn()}
      userWorkoutsFetched
      teamIsFetched
      isAuthenticated
    />);

    expect(wrapper.find('.profile-page.loading').length).toBe(1);
  });

  it('should redirect to /signin when !isAuthenticated', () => {
    const history = {
      replace: jest.fn(),
    };
    shallow(<Profile
      history={history}
      match={match}
      userId={userId}
      user={user}
      userProfile={userProfile}
      team={team}
      userWorkouts={userWorkouts}
      fetchUserProfile={jest.fn()}
      fetchUserTeam={jest.fn()}
      fetchUserWorkouts={jest.fn()}
      userWorkoutsFetched
      teamIsFetched
    />);

    expect(history.replace).toBeCalled();
  });

  it('should fetch user, userTeam, workouts, and teamWorkouts when not present', () => {
    const fetchUser = jest.fn();
    const fetchUserTeam = jest.fn();
    const fetchUserProfile = jest.fn();
    const fetchUserWorkouts = jest.fn();
    shallow(<Profile
      match={match}
      isAuthenticated
      fetchUser={fetchUser}
      fetchUserProfile={fetchUserProfile}
      fetchUserTeam={fetchUserTeam}
      fetchUserWorkouts={fetchUserWorkouts}
      userId={userId}
    />);

    expect(fetchUser).toBeCalled();
    expect(fetchUserProfile).toBeCalled();
    expect(fetchUserTeam).toBeCalled();
    expect(fetchUserWorkouts).toBeCalled();
  });

  it('should open/close AddWorkout modal', () => {
    const wrapper = shallow(<Profile
      match={match}
      userId={userId}
      user={user}
      userProfile={userProfile}
      team={team}
      userWorkouts={userWorkouts}
      fetchUserProfile={jest.fn()}
      fetchUserTeam={jest.fn()}
      fetchUserWorkouts={jest.fn()}
      userProfileIsFetched
      userWorkoutsFetched
      teamIsFetched
      isAuthenticated
    />);

    wrapper.instance().onAddWorkoutModalOpen();
    expect(wrapper.state().showAddWorkoutModal).toBeTruthy();
    wrapper.instance().onAddWorkoutModalClose();
    expect(wrapper.state().showAddWorkoutModal).toBeFalsy();
  });

  it('should call componentDidUpdate when props change', () => {
    const fetchUserProfile = jest.fn();
    const fetchUserTeam = jest.fn();
    const fetchUserWorkouts = jest.fn();
    const componentDidUpdate = jest.spyOn(Profile.prototype, 'componentDidUpdate');
    const wrapper = shallow(<Profile
      match={match}
      userId={userId}
      user={user}
      userProfile={userProfile}
      team={team}
      userWorkouts={userWorkouts}
      fetchUserProfile={fetchUserProfile}
      fetchUserTeam={fetchUserTeam}
      fetchUserWorkouts={fetchUserWorkouts}
      userProfileIsFetched
      userWorkoutsFetched
      teamIsFetched
      isAuthenticated
    />);

    /* re-fetch data if userId URL param changes */
    wrapper.setProps({
      match: {
        params: {
          userId: '2',
        },
      },
    });

    expect(componentDidUpdate).toBeCalled();
    expect(fetchUserProfile).toBeCalled();
    expect(fetchUserTeam).toBeCalled();
    expect(fetchUserWorkouts).toBeCalled();

    /* cover the case when props.match.params.userId is the same */
    wrapper.setProps({
      match: {
        params: {
          userId: '2',
        },
      },
    });
    expect(componentDidUpdate).toBeCalled();
  });

  it('should handle mapStateToProps', () => {
    const state = {
      auth: {
        userId: '1',
        user: {
          _id: '1',
        },
        isAuthenticated: true,
      },
      user: {
        userProfile: {
          _id: '1',
          name: 'Athlete 1',
        },
        isFetchingUserProfile: false,
        userProfileIsFetched: true,
        userProfileIsUpdated: false,
      },
      workouts: {
        userList: [
          {
            _id: '10',
            distance: 2000,
            timeString: '6:00',
          },
        ],
        isFetchingUserWorkouts: false,
        userWorkoutsFetched: true,
        workoutStatusText: '',
        workoutIsAdded: false,
      },
      team: {
        team: {
          _id: '100',
          name: 'Team 1',
        },
        isFetchingTeam: false,
        teamIsFetched: true,
        isCoach: true,
      },
    };

    expect(mapStateToProps(state)).toEqual(
      {
        userId: state.auth.userId,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        userProfile: state.user.userProfile,
        isFetchingUserProfile: state.user.isFetchingUserProfile,
        userProfileIsFetched: state.user.userProfileIsFetched,
        userProfileIsUpdated: state.user.userProfileIsUpdated,
        userWorkouts: state.workouts.userList,
        isFetchingUserWorkouts: state.workouts.isFetchingUserWorkouts,
        userWorkoutsFetched: state.workouts.userWorkoutsFetched,
        workoutStatusText: state.workouts.statusText,
        workoutIsAdded: state.workouts.workoutIsAdded,
        team: state.team.team,
        isFetchingTeam: state.team.isFetchingTeam,
        teamIsFetched: state.team.teamIsFetched,
        isCoach: state.team.isCoach,
      },
    );
  });
});
