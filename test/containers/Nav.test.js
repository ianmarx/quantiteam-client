import React from 'react';
import { shallow } from 'enzyme';
import { Nav, mapStateToProps } from '../../src/containers/Nav';

describe('<Nav />', () => {
  it('should render expected elements when isAuthenticated', () => {
    const wrapper = shallow(<Nav
      userId='1'
      isAuthenticated
    />);

    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('.nav-list').length).toBe(1);
    expect(wrapper.find('.logo').length).toBe(1);
    expect(wrapper.find('.nav-button').length).toBe(4);
  });

  it('should render expected elements when !isAuthenticated', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper.find('.nav-button').length).toBe(3);
  });

  it('should signOutUser on .sign-out click', () => {
    const onSignOutClick = jest.spyOn(Nav.prototype, 'onSignOutClick');
    const signOutUser = jest.fn();
    const wrapper = shallow(<Nav
      userId='1'
      isAuthenticated
      signOutUser={signOutUser}
    />);

    wrapper.find('.sign-out').simulate('click');
    expect(onSignOutClick).toBeCalled();
    expect(signOutUser).toBeCalled();
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
