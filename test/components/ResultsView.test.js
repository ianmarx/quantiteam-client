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

const results = [
  {
    _id: '1',
    date: Date.now(),
    distance: 2000,
    timeString: '6:00',
  },
];

describe('<ResultsView />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<ResultsView
      results={results}
      teamWorkout={distTeamWorkout}
    />);

    expect(wrapper.find('.results-view').length).toBe(1);
    expect(wrapper.find('.h1').length).toBe(1);
    expect(wrapper.find('.result-feed').length).toBe(1);
  });

  it('should show .instructions when results is empty', () => {
    const wrapper = shallow(<ResultsView
      results={[]}
      teamWorkout={distTeamWorkout}
    />);

    expect(wrapper.find('.instructions').length).toBe(1);
  });

  it('should handle onViewModeClick', () => {
    const onViewModeClick = jest.spyOn(ResultsView.prototype, 'onViewModeClick');
    const wrapper = shallow(<ResultsView
      results={results}
      teamWorkout={distTeamWorkout}
      isCoach
    />);

    wrapper.setState({ inEditMode: true });

    wrapper.find('#viewModeButton').simulate('click');
    expect(onViewModeClick).toBeCalled();
    expect(wrapper.state().inEditMode).toBeFalsy();
  });

  it('should handle onEditModeClick', () => {
    const onEditModeClick = jest.spyOn(ResultsView.prototype, 'onEditModeClick');
    const wrapper = shallow(<ResultsView
      results={results}
      teamWorkout={distTeamWorkout}
      isCoach
    />);

    wrapper.find('#editModeButton').simulate('click');
    expect(onEditModeClick).toBeCalled();
    expect(wrapper.state().inEditMode).toBeTruthy();
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
