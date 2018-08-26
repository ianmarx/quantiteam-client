import React from 'react';
import { shallow } from 'enzyme';
import WorkoutFeed from '../../src/components/WorkoutFeed';

const teamWorkouts = [
  {
    _id: '1',
    distance: 2000,
    type: 'distance',
    date: Date.now(),
  },
  {
    _id: '2',
    distance: 2000,
    type: 'time',
    date: Date.now(),
  },
];

const soloWorkouts = [
  {
    _id: '1',
    creatorName: 'Athlete 1',
    distance: 2000,
    timeString: '6:00',
    date: Date.now(),
  },
  {
    _id: '2',
    creatorName: 'Athlete 2',
    distance: 2000,
    timeString: '6:05',
    date: Date.now(),
  },
];

describe('<WorkoutFeed />', () => {
  it('should render expected elements when isCoach', () => {
    const wrapper = shallow(<WorkoutFeed
      soloWorkouts={soloWorkouts}
      teamWorkouts={teamWorkouts}
      isCoach
    />);

    expect(wrapper.find('.workout-feed').length).toBe(1);
    expect(wrapper.find('.feed-title').length).toBe(1);
    expect(wrapper.find('#team-workout-modal-button').length).toBe(1);
    expect(wrapper.find('#modal-button').length).toBe(0);
  });

  it('should render expected elements when !isCoach', () => {
    const wrapper = shallow(<WorkoutFeed
      soloWorkouts={soloWorkouts}
      teamWorkouts={teamWorkouts}
    />);

    expect(wrapper.find('#team-workout-modal-button').length).toBe(0);
    expect(wrapper.find('#modal-button').length).toBe(1);
  });

  it('should render loading screen if isFetchingTeamWorkouts', () => {
    const wrapper = shallow(<WorkoutFeed
      isFetchingTeamWorkouts
    />);

    expect(wrapper.find('.workout-feed.loading').length).toBe(1);
    expect(wrapper.find('.feed-title').length).toBe(1);
    expect(wrapper.find('#modal-button').length).toBe(0);
    expect(wrapper.find('#team-workout-modal-button').length).toBe(0);
  });
});
