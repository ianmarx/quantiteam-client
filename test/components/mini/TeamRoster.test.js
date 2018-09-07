import React from 'react';
import { shallow } from 'enzyme';
import TeamRoster from '../../../src/components/mini/TeamRoster';

const athletes = [
  {
    _id: 1,
    name: 'Athlete 1',
  },
  {
    _id: 2,
    name: 'Athlete 2',
  },
  {
    _id: 3,
    name: 'Athlete 3',
  },
];

const coaches = [
  {
    _id: 1,
    name: 'Coach 1',
  },
  {
    _id: 2,
    name: 'Coach 2',
  },
];

describe('<TeamRoster /> component', () => {
  it('should render expected elements with no props', () => {
    const wrapper = shallow(<TeamRoster />);
    expect(wrapper.find('.team-roster-modal-container').length).toBe(1);
    expect(wrapper.find('.team-roster').length).toBe(1);
    expect(wrapper.find('.athlete-list').length).toBe(1);
    expect(wrapper.find('.h2').length).toBe(2);
    expect(wrapper.find('.not-found').length).toBe(2);
    expect(wrapper.find('.athlete').length).toBe(0);
    expect(wrapper.find('.profile-link').length).toBe(0);
    expect(wrapper.find('.coach-list').length).toBe(1);
    expect(wrapper.find('.modal-close').length).toBe(1);
  });

  it('should render expected elements when only props.athletes is present', () => {
    const wrapper = shallow(<TeamRoster
      athletes={athletes}
    />);
    expect(wrapper.find('.not-found').length).toBe(1);
    expect(wrapper.find('.athlete').length).toBe(3);
    expect(wrapper.find('.profile-link').length).toBe(3);
    expect(wrapper.find('.coach').length).toBe(0);
  });

  it('should render expected elements when only props.coaches is present', () => {
    const wrapper = shallow(<TeamRoster
      coaches={coaches}
    />);
    expect(wrapper.find('.not-found').length).toBe(1);
    expect(wrapper.find('.athlete').length).toBe(0);
    expect(wrapper.find('.profile-link').length).toBe(2);
    expect(wrapper.find('.coach').length).toBe(2);
  });

  it('should render expected elements when props.coaches and props.athletes are present', () => {
    const wrapper = shallow(<TeamRoster
      athletes={athletes}
      coaches={coaches}
    />);
    expect(wrapper.find('.not-found').length).toBe(0);
    expect(wrapper.find('.athlete').length).toBe(3);
    expect(wrapper.find('.profile-link').length).toBe(5);
    expect(wrapper.find('.coach').length).toBe(2);
  });
});
