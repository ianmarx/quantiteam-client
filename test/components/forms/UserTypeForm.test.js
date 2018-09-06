import React from 'react';
import { shallow } from 'enzyme';
import UserTypeForm from '../../../src/components/forms/UserTypeForm';

describe('<UserTypeForm />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<UserTypeForm
      teamCode=''
      userType='athlete'
    />);

    expect(wrapper.find('.user-type-form').length).toBe(1);
    expect(wrapper.find('.button-group').length).toBe(1);
    expect(wrapper.find('.btn-role-select').length).toBe(2);
    expect(wrapper.find('.field').length).toBe(1);
    expect(wrapper.find('#team-code').length).toBe(1);
    expect(wrapper.find('.btn-submit').length).toBe(1);
    expect(wrapper.find('.btn-prev').length).toBe(1);
    expect(wrapper.find('.already-user').length).toBe(1);

    wrapper.setProps({ userType: 'coach' });
    expect(wrapper.find('#team-name').length).toBe(1);
  });

  it('should assign .valid class to #team-code field', () => {
    const wrapper = shallow(<UserTypeForm
      teamName='Team 1'
      teamCodeIsValid
      userType='athlete'
    />);

    expect(wrapper.find('#team-code.valid').length).toBe(1);
  });

  it('should assign .valid class to #team-name field', () => {
    const wrapper = shallow(<UserTypeForm
      teamName='Team 1'
      teamNameIsAvailable
      userType='coach'
    />);

    expect(wrapper.find('#team-name.valid').length).toBe(1);
  });
});
