import React from 'react';
import { shallow } from 'enzyme';
import TeamWorkoutFeed from '../../src/components/TeamWorkoutFeed';

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

describe('<TeamWorkoutFeed />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<TeamWorkoutFeed
      teamWorkouts={teamWorkouts}
      isCoach
    />);

    expect(wrapper.find('.workout-feed').length).toBe(1);
    expect(wrapper.find('#modal-button').length).toBe(1);
  });

  it('should render loading screen if isFetchingUserWorkouts', () => {
    const wrapper = shallow(<TeamWorkoutFeed
      isFetchingTeamWorkouts
    />);

    expect(wrapper.find('.workout-feed.loading').length).toBe(1);
  });
});
