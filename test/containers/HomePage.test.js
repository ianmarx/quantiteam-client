import React from 'react';
import { shallow } from 'enzyme';
import { HomePage, mapStateToProps } from '../../src/containers/HomePage';

const userId = '1';

const user = {
  id: '1',
};

const team = {
  id: '1',
  name: 'Team 1',
};

const teamWorkouts = [
  {
    distance: 2000,
  },
];

describe('<HomePage />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<HomePage
      userId={userId}
      user={user}
      team={team}
      soloWorkouts={[]}
      teamWorkouts={teamWorkouts}
      userIsFetched
      teamIsFetched
      soloWorkoutsFetched
      teamWorkoutsFetched
    />);

    expect(wrapper.find('.home-page').length).toBe(1);
    expect(wrapper.find('.workout-feed-container').length).toBe(1);
    expect(wrapper.find('.modal').length).toBe(4);
  });

  it('should fetch user, userTeam, workouts, and teamWorkouts when not present', () => {
    const fetchUser = jest.fn();
    const fetchUserTeam = jest.fn();
    const fetchTeamWorkouts = jest.fn();
    const fetchSoloWorkouts = jest.fn();
    const wrapper = shallow(<HomePage
      fetchUser={fetchUser}
      fetchUserTeam={fetchUserTeam}
      fetchSoloWorkouts={fetchSoloWorkouts}
      fetchTeamWorkouts={fetchTeamWorkouts}
      userId={userId}
    />);

    expect(fetchUser).toBeCalled();
    expect(fetchUserTeam).toBeCalled();
    expect(fetchTeamWorkouts).toBeCalled();
    expect(fetchSoloWorkouts).toBeCalled();
    expect(wrapper.find('.home-page.loading').length).toBe(1);
  });

  it('should render loading screen when not all data is not fetched', () => {
    const wrapper = shallow(<HomePage
      userId={userId}
      user={user}
      team={team}
      soloWorkouts={[]}
      teamWorkouts={teamWorkouts}
    />);

    expect(wrapper.find('.home-page.loading').length).toBe(1);
  });

  it('should fetchTeamWorkout() before opening AddResultForm', async () => {
    const onAddResultModalOpen = jest.spyOn(HomePage.prototype, 'onAddResultModalOpen');
    const fetchTeamWorkout = jest.fn(() => true);
    const wrapper = shallow(<HomePage
      userId={userId}
      user={user}
      team={team}
      soloWorkouts={[]}
      teamWorkouts={teamWorkouts}
      fetchTeamWorkout={fetchTeamWorkout}
      userIsFetched
      teamIsFetched
      soloWorkoutsFetched
      teamWorkoutsFetched
    />);

    wrapper.instance().onAddResultClick();
    expect(fetchTeamWorkout).toBeCalled();
    const data = await fetchTeamWorkout;
    expect(data).toBeTruthy();
    expect(onAddResultModalOpen).toBeCalled();
    expect(wrapper.state().showAddResultModal).toBeTruthy();
  });

  it('should fetchTeamWorkout() and fetch time/dist results before opening ResultsView', async () => {
    const onViewResultsModalOpen = jest.spyOn(HomePage.prototype, 'onViewResultsModalOpen');
    const fetchTeamWorkout = jest.fn(() => true);
    const fetchTimeResults = jest.fn(() => true);
    const fetchDistResults = jest.fn(() => true);
    const wrapper = shallow(<HomePage
      userId={userId}
      user={user}
      team={team}
      soloWorkouts={[]}
      teamWorkouts={teamWorkouts}
      fetchTeamWorkout={fetchTeamWorkout}
      fetchTimeResults={fetchTimeResults}
      fetchDistResults={fetchDistResults}
      userIsFetched
      teamIsFetched
      soloWorkoutsFetched
      teamWorkoutsFetched
    />);

    /* distance case */
    wrapper.instance().onViewResultsClick('1', 'distance');
    expect(fetchTeamWorkout).toBeCalled();
    const data = await fetchTeamWorkout;
    expect(data).toBeTruthy();
    expect(fetchTimeResults).toBeCalled();
    const data2 = await fetchTimeResults;
    expect(data2).toBeTruthy();
    expect(onViewResultsModalOpen).toBeCalled();
    expect(wrapper.state().showViewResultsModal).toBeTruthy();

    wrapper.setState({ showViewResultsModal: false });

    /* time case */
    wrapper.instance().onViewResultsClick('1', 'time');
    await fetchTeamWorkout;
    expect(fetchDistResults).toBeCalled();
    const data3 = await fetchDistResults;
    expect(data3).toBeTruthy();
    expect(onViewResultsModalOpen).toBeCalled();
    expect(wrapper.state().showViewResultsModal).toBeTruthy();
  });

  it('should open/close each modal', () => {
    const wrapper = shallow(<HomePage
      userId={userId}
      user={user}
      team={team}
      soloWorkouts={[]}
      teamWorkouts={teamWorkouts}
      userIsFetched
      teamIsFetched
      soloWorkoutsFetched
      teamWorkoutsFetched
    />);

    wrapper.instance().onAddWorkoutModalOpen();
    expect(wrapper.state().showAddWorkoutModal).toBeTruthy();
    wrapper.instance().onAddWorkoutModalClose();
    expect(wrapper.state().showAddWorkoutModal).toBeFalsy();

    wrapper.instance().onTeamWorkoutModalOpen();
    expect(wrapper.state().showAddTeamWorkoutModal).toBeTruthy();
    wrapper.instance().onTeamWorkoutModalClose();
    expect(wrapper.state().showAddTeamWorkoutModal).toBeFalsy();

    wrapper.instance().onAddResultModalOpen();
    expect(wrapper.state().showAddResultModal).toBeTruthy();
    wrapper.instance().onAddResultModalClose();
    expect(wrapper.state().showAddResultModal).toBeFalsy();

    wrapper.instance().onAddResultModalOpen();
    expect(wrapper.state().showAddResultModal).toBeTruthy();
    wrapper.instance().onAddResultModalClose();
    expect(wrapper.state().showAddResultModal).toBeFalsy();

    wrapper.instance().onViewResultsModalOpen();
    expect(wrapper.state().showViewResultsModal).toBeTruthy();
    wrapper.instance().onViewResultsModalClose();
    expect(wrapper.state().showViewResultsModal).toBeFalsy();
  });

  it('should handle mapStateToProps as expected', () => {
    const state = {
      auth: {
        userId: '1',
        user: {
          _id: '1',
        },
        isFetchingUser: false,
        userIsFetched: true,
      },
      workouts: {
        soloList: [],
        workoutIsAdded: false,
        isFetchingSoloWorkouts: false,
        soloWorkoutsFetched: true,
        workoutStatusText: '',
      },
      team: {
        team: {
          _id: '1',
          name: 'Team 1',
        },
        teamIsFetched: true,
        isCoach: false,
      },
      teamWorkouts: {
        list: [],
        currentTeamWorkout: {},
        isFetchingTeamWorkout: false,
        isFetchingTeamWorkouts: false,
        isFetchingResults: false,
        currentResults: [],
      },
      user: {
        queryResults: [],
      },
    };

    expect(mapStateToProps(state)).toEqual(
      {
        userId: state.auth.userId,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        isFetchingUser: state.auth.isFetchingUser,
        userIsFetched: state.auth.userIsFetched,
        soloWorkouts: state.workouts.soloList,
        workoutIsAdded: state.workouts.workoutIsAdded,
        isFetchingSoloWorkouts: state.workouts.isFetchingSoloWorkouts,
        soloWorkoutsFetched: state.workouts.soloWorkoutsFetched,
        workoutStatusText: state.workouts.statusText,
        team: state.team.team,
        isFetchingTeam: state.team.isFetchingTeam,
        teamIsFetched: state.team.teamIsFetched,
        isCoach: state.team.isCoach,
        teamWorkouts: state.teamWorkouts.list,
        isFetchingTeamWorkouts: state.teamWorkouts.isFetchingTeamWorkouts,
        teamWorkoutsFetched: state.teamWorkouts.teamWorkoutsFetched,
        currentTeamWorkout: state.teamWorkouts.currentTeamWorkout,
        isFetchingTeamWorkout: state.teamWorkouts.isFetchingTeamWorkout,
        isFetchingResults: state.teamWorkouts.isFetchingResults,
        currentResults: state.teamWorkouts.currentResults,
        queryResults: state.user.queryResults,
      },
    );
  });
});
