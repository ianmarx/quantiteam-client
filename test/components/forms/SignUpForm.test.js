import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../src/components/forms/SignUpForm';

describe('<SignUpForm />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<SignUpForm statusText='error!' />);

    expect(wrapper.find('.sign-up-form').length).toBe(1);
    expect(wrapper.find('.field').length).toBe(4);
    expect(wrapper.find('.status-text').length).toBe(1);
  });

  it('should call props.onSubmit when form is submitted', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<SignUpForm onSubmit={onSubmit} />);

    wrapper.find('.sign-up-form').simulate('submit', {});
    expect(onSubmit).toBeCalled();
  });

  it('should call props.onBackClick when .btn-prev is clicked', () => {
    const onBackClick = jest.fn();
    const wrapper = shallow(<SignUpForm onBackClick={onBackClick} />);

    wrapper.find('.btn-prev').simulate('click');
    expect(onBackClick).toBeCalled();
  });
});
