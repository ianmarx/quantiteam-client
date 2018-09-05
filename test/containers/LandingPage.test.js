import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage, mapStateToProps } from '../../src/containers/LandingPage';

describe('<LandingPage />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<LandingPage
      userId='1'
      isAuthenticated
    />);

    expect(wrapper.find('.info-box').length).toBe(5);
    expect(wrapper.find('.header').length).toBe(1);
    expect(wrapper.find('.tagline').length).toBe(1);
    expect(wrapper.find('.cta-button').length).toBe(2);
    expect(wrapper.find('.already-user').length).toBe(1);
  });

  it('should handle mapStateToProps', () => {
    const state = {
      auth: {
        userId: '1',
        isAuthenticated: true,
      },
    };

    expect(mapStateToProps(state)).toEqual(
      {
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated,
      },
    );
  });
});
