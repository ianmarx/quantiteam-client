import React from 'react';
import { shallow } from 'enzyme';
import SoloWorkoutFeed from '../../src/components/SoloWorkoutFeed';

const soloWorkouts = [
  {
    _id: '1',
    distance: 2000,
    timeString: '6:00',
    date: Date.now(),
  },
  {
    _id: '2',
    distance: 2000,
    timeString: '6:05',
    date: Date.now(),
  },
];

describe('<SoloWorkoutFeed />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<SoloWorkoutFeed
      soloWorkouts={soloWorkouts}
    />);

    expect(wrapper.find('.workout-feed').length).toBe(1);
    expect(wrapper.find('.feed-title').length).toBe(1);
    expect(wrapper.find('#modal-button').length).toBe(1);
  });

  it('should render loading screen if isFetchingUserWorkouts', () => {
    const wrapper = shallow(<SoloWorkoutFeed
      isFetchingUserWorkouts
    />);

    expect(wrapper.find('.workout-feed.loading').length).toBe(1);
    expect(wrapper.find('.feed-title').length).toBe(1);
    expect(wrapper.find('#modal-button').length).toBe(0);
  });
});
