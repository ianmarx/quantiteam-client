import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from '../../src/components/UserInfo';

const user = {
  _id: '1',
  name: 'Athlete 1',
  weight: 200,
  position: 'starboard',
  classYear: 2020,
};

const team = {
  name: 'Team 1',
};

describe('<UserInfo />', () => {
  it('should render expected elements for view mode', () => {
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    expect(wrapper.find('.user-info').length).toBe(1);
    expect(wrapper.find('.content').length).toBe(2);
    expect(wrapper.find('.col-unit').length).toBe(4);
    expect(wrapper.find('.btn-hollow-1').length).toBe(1);
  });

  it('should render expected elements for edit mode', () => {
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    wrapper.setState({ isEditing: true });

    expect(wrapper.find('.user-info.edit').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('.btn-hollow-1').length).toBe(1);
    expect(wrapper.find('.btn-hollow-2').length).toBe(1);
  });

  it('should exit edit mode when cancel button is clicked', () => {
    const onCancelClick = jest.spyOn(UserInfo.prototype, 'onCancelClick');
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    wrapper.setState({ isEditing: true });

    wrapper.find('.btn-hollow-1').simulate('click');
    expect(onCancelClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeFalsy();
  });

  it('should enter edit mode when edit button is clicked', () => {
    const onEditClick = jest.spyOn(UserInfo.prototype, 'onEditClick');
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    wrapper.find('.btn-hollow-1').simulate('click');
    expect(onEditClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeTruthy();
    expect(wrapper.find('.user-info.edit').length).toBe(1);
  });

  it('should handle change in name field', () => {
    const onNameChange = jest.spyOn(UserInfo.prototype, 'onNameChange');
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    wrapper.setState({ isEditing: true });

    const event = {
      target: { value: 'Athlete 2' },
    };

    wrapper.find('input.name').simulate('change', event);
    expect(onNameChange).toBeCalled();
    expect(wrapper.state().name).toBe('Athlete 2');
  });

  it('should handle change in weight field', () => {
    const onWeightChange = jest.spyOn(UserInfo.prototype, 'onWeightChange');
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    wrapper.setState({ isEditing: true });

    const event = {
      target: { value: '210' },
    };

    wrapper.find('input.weight').simulate('change', event);
    expect(onWeightChange).toBeCalled();
    expect(wrapper.state().weight).toBe('210');
  });

  it('should handle change in position field', () => {
    const onPositionChange = jest.spyOn(UserInfo.prototype, 'onPositionChange');
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    wrapper.setState({ isEditing: true });

    const event = {
      target: { value: 'port' },
    };

    wrapper.find('select.position').simulate('change', event);
    expect(onPositionChange).toBeCalled();
    expect(wrapper.state().position).toBe('port');
  });

  it('should handle change in classYear field', () => {
    const onClassYearChange = jest.spyOn(UserInfo.prototype, 'onClassYearChange');
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
    />);

    wrapper.setState({ isEditing: true });

    const event = {
      target: { value: '2019' },
    };

    wrapper.find('input.class-year').simulate('change', event);
    expect(onClassYearChange).toBeCalled();
    expect(wrapper.state().classYear).toBe('2019');
  });

  it('should updateUser() and exit edit mode in onSubmit() when profileIsUpdated', async () => {
    const onSubmit = jest.spyOn(UserInfo.prototype, 'onSubmit');
    const updateUser = jest.fn(() => true);
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
      updateUser={updateUser}
      profileIsUpdated
    />);

    wrapper.setState({ isEditing: true, name: 'Athlete 2' });

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('.user-info.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(updateUser).toBeCalled();
    const data = await updateUser;
    expect(data).toBeTruthy();
    expect(wrapper.state().isEditing).toBeFalsy();
  });

  it('should not call updateUser in onSubmit when input is invalid', async () => {
    const onSubmit = jest.spyOn(UserInfo.prototype, 'onSubmit');
    const validateInput = jest.spyOn(UserInfo.prototype, 'validateInput');
    const updateUser = jest.fn(() => true);
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
      updateUser={updateUser}
      profileIsUpdated
    />);

    wrapper.setState({
      isEditing: true,
      name: '//////',
      weight: '///',
      classYear: '12345',
    });

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('.user-info.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(validateInput).toBeCalled();
    expect(updateUser).not.toBeCalled();
  });

  it('should not exit edit mode in onSubmit() when !profileIsUpdated', () => {
    const wrapper = shallow(<UserInfo
      currentUserId='1'
      user={user}
      team={team}
      updateUser={jest.fn()}
    />);

    wrapper.setState({ isEditing: true, name: 'Athlete 2' });

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('.user-info.edit').simulate('submit', event);
    expect(wrapper.state().isEditing).toBeTruthy();
  });
});
