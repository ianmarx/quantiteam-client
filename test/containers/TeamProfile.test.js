import React from 'react';
import { shallow } from 'enzyme';
import { TeamProfile, mapStateToProps } from '../../src/containers/TeamProfile';

const userId = '1';

const user = {
  _id: '1',
};

const team = {
  _id: '1',
  name: 'Team 1',
};

const teamWorkouts = [
  {
    distance: 2000,
  },
];

describe('<TeamProfile />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<TeamProfile
      isAuthenticated
      userId={userId}
      user={user}
      team={team}
      teamWorkouts={teamWorkouts}
      fetchTeamWorkouts={jest.fn()}
      userIsFetched
      teamIsFetched
      teamWorkoutsFetched
    />);

    expect(wrapper.find('.team-page-container').length).toBe(1);
  });

  it('should render loading screen when data is not fetched', () => {
    const wrapper = shallow(<TeamProfile
      isAuthenticated
      userId={userId}
      user={user}
      team={team}
      teamWorkouts={teamWorkouts}
      fetchUser={jest.fn()}
      fetchUserTeam={jest.fn()}
      fetchTeamWorkouts={jest.fn()}
    />);

    expect(wrapper.find('.team-page-container').length).toBe(0);
  });

  it('should redirect to /signin when !isAuthenticated', () => {
    const history = {
      replace: jest.fn(),
    };
    shallow(<TeamProfile
      history={history}
      userId={userId}
      user={user}
      team={team}
      teamWorkouts={teamWorkouts}
      fetchTeamWorkouts={jest.fn()}
      userIsFetched
      teamIsFetched
      teamWorkoutsFetched
    />);

    expect(history.replace).toBeCalled();
  });

  it('should fetchTeamWorkout() before opening AddResultForm', async () => {
    const onAddResultModalOpen = jest.spyOn(TeamProfile.prototype, 'onAddResultModalOpen');
    const fetchTeamWorkout = jest.fn(() => true);
    const wrapper = shallow(<TeamProfile
      isAuthenticated
      userId={userId}
      user={user}
      team={team}
      teamWorkouts={teamWorkouts}
      fetchTeamWorkouts={jest.fn()}
      fetchTeamWorkout={fetchTeamWorkout}
      userIsFetched
      teamIsFetched
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
    const onViewResultsModalOpen = jest.spyOn(TeamProfile.prototype, 'onViewResultsModalOpen');
    const fetchTeamWorkout = jest.fn(() => true);
    const fetchTimeResults = jest.fn(() => true);
    const fetchDistResults = jest.fn(() => true);
    const wrapper = shallow(<TeamProfile
      isAuthenticated
      userId={userId}
      user={user}
      team={team}
      teamWorkouts={teamWorkouts}
      fetchTeamWorkouts={jest.fn()}
      fetchTeamWorkout={fetchTeamWorkout}
      fetchTimeResults={fetchTimeResults}
      fetchDistResults={fetchDistResults}
      userIsFetched
      teamIsFetched
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

  it('should open/close modals', () => {
    const wrapper = shallow(<TeamProfile
      isAuthenticated
      userId={userId}
      user={user}
      team={team}
      teamWorkouts={teamWorkouts}
      fetchTeamWorkouts={jest.fn()}
      userIsFetched
      teamIsFetched
      teamWorkoutsFetched
    />);

    wrapper.instance().onAddTeamWorkoutModalOpen();
    expect(wrapper.state().showAddTeamWorkoutModal).toBeTruthy();
    wrapper.instance().onAddTeamWorkoutModalClose();
    expect(wrapper.state().showAddTeamWorkoutModal).toBeFalsy();

    wrapper.instance().onAddResultModalOpen();
    expect(wrapper.state().showAddResultModal).toBeTruthy();
    wrapper.instance().onAddResultModalClose();
    expect(wrapper.state().showAddResultModal).toBeFalsy();

    wrapper.instance().onViewResultsModalOpen();
    expect(wrapper.state().showViewResultsModal).toBeTruthy();
    wrapper.instance().onViewResultsModalClose();
    expect(wrapper.state().showViewResultsModal).toBeFalsy();

    wrapper.instance().onTeamRosterModalOpen();
    expect(wrapper.state().showTeamRosterModal).toBeTruthy();
    wrapper.instance().onTeamRosterModalClose();
    expect(wrapper.state().showTeamRosterModal).toBeFalsy();
  });

  it('should handle mapStateToProps', () => {
    const state = {
      auth: {
        userId: '1',
        user: {
          _id: '1',
        },
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
        team: state.team.team,
        isFetchingTeam: state.team.isFetchingTeam,
        teamIsFetched: state.team.teamIsFetched,
        isCoach: state.team.isCoach,
        teamWorkouts: state.teamWorkouts.list,
        isFetchingTeamWorkouts: state.teamWorkouts.isFetchingTeamWorkouts,
        teamWorkoutsFetched: state.teamWorkouts.teamWorkoutsFetched,
        currentTeamWorkout: state.teamWorkouts.currentTeamWorkout,
        currentResults: state.teamWorkouts.currentResults,
        isFetchingTeamWorkout: state.teamWorkouts.isFetchingTeamWorkout,
        isFetchingResults: state.teamWorkouts.isFetchingResults,
        queryResults: state.user.queryResults,
      },
    );
  });
});
