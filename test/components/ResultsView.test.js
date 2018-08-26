import React from 'react';
import { shallow } from 'enzyme';
import ResultsView from '../../src/components/ResultsView';

const distTeamWorkout = {
  id: '1',
  type: 'distance',
  distance: 2000,
  results: [
    {
      _id: '1',
    },
  ],
};

const timeTeamWorkout = {
  id: '1',
  type: 'time',
  timeString: '6:00',
  results: [
    {
      _id: '1',
    },
  ],
};

const results = [
  {
    _id: '1',
    date: Date.now(),
    distance: 2000,
    timeString: '6:00',
  },
];

describe('<ResultsView />', () => {
  it('should render expected elements for distance team workout', () => {
    const wrapper = shallow(<ResultsView
      results={results}
      teamWorkout={distTeamWorkout}
    />);

    expect(wrapper.find('.results-view-container').length).toBe(1);
    expect(wrapper.find('.results-title.distance').length).toBe(1);
    expect(wrapper.find('.result-feed').length).toBe(1);
  });

  it('should render time header for time team workout', () => {
    const wrapper = shallow(<ResultsView
      results={results}
      teamWorkout={timeTeamWorkout}
    />);

    expect(wrapper.find('.results-title.time').length).toBe(1);
  });

  it('should show .instructions when results is empty', () => {
    const wrapper = shallow(<ResultsView
      results={[]}
      teamWorkout={distTeamWorkout}
    />);

    expect(wrapper.find('.instructions').length).toBe(1);
  });

  it('should handle .modal-close click', () => {
    const onModalClose = jest.fn();
    const wrapper = shallow(<ResultsView
      onModalClose={onModalClose}
      results={[]}
      teamWorkout={distTeamWorkout}
    />);

    wrapper.find('.modal-close').simulate('click');
    expect(onModalClose).toBeCalled();
  });
});
