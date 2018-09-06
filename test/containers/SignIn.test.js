import React from 'react';
import { shallow } from 'enzyme';
import { SignIn, mapStateToProps } from '../../src/containers/SignIn';

describe('<SignIn />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<SignIn />);

    expect(wrapper.find('.sign-in-form').length).toBe(1);
    expect(wrapper.find('.field').length).toBe(2);
    expect(wrapper.find('.signin-button').length).toBe(1);
    expect(wrapper.find('.back-button').length).toBe(1);

    wrapper.setProps({ statusText: 'invalid input' });
    expect(wrapper.find('.status-text').length).toBe(1);
  });

  it('should redirect when isAuthenticated', () => {
    const history = {
      replace: jest.fn(),
    };
    shallow(<SignIn
      isAuthenticated
      history={history}
    />);

    expect(history.replace).toBeCalled();
  });

  it('should handle change in email field', () => {
    const wrapper = shallow(<SignIn />);

    const event = {
      target: { value: 'email@email.com' },
    };

    wrapper.find('input.email').simulate('change', event);
    expect(wrapper.state().email).toBe('email@email.com');
  });

  it('should handle change in password field', () => {
    const wrapper = shallow(<SignIn />);

    const event = {
      target: { value: 'password' },
    };

    wrapper.find('input.password').simulate('change', event);
    expect(wrapper.state().password).toBe('password');
  });

  it('should signInUser() when form is submitted', () => {
    const onSubmit = jest.spyOn(SignIn.prototype, 'onSubmit');
    const signInUser = jest.fn();
    const wrapper = shallow(<SignIn signInUser={signInUser} />);

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(signInUser).toBeCalled();
  });

  it('should handle mapStateToProps', () => {
    const state = {
      auth: {
        isAuthenticated: false,
        statusText: null,
      },
    };

    expect(mapStateToProps(state)).toEqual(
      {
        isAuthenticated: state.auth.isAuthenticated,
        statusText: state.auth.statusText,
      },
    );
  });
});
