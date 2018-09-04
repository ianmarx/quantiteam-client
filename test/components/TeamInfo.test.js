import React from 'react';
import { shallow } from 'enzyme';
import TeamInfo from '../../src/components/TeamInfo';

const team = {
  name: 'Team 1',
  teamCode: 'asdf1234',
};

describe('<TeamInfo />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<TeamInfo
      team={team}
      isCoach
    />);

    expect(wrapper.find('.team-info').length).toBe(1);
    expect(wrapper.find('.team-name').length).toBe(1);
    expect(wrapper.find('.team-details').length).toBe(1);
    expect(wrapper.find('.team-code').length).toBe(1);
    expect(wrapper.find('.view-roster-button').length).toBe(1);
  });

  it('should call onViewRosterClick when .view-roster-button is clicked', () => {
    const onViewRosterClick = jest.fn();
    const wrapper = shallow(<TeamInfo
      team={team}
      onViewRosterClick={onViewRosterClick}
      isCoach
    />);

    wrapper.find('.view-roster-button').simulate('click');
    expect(onViewRosterClick).toBeCalled();
  });
});
