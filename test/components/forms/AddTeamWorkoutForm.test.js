import React from 'react';
import { shallow, mount } from 'enzyme';
import AddTeamWorkoutForm from '../../../src/components/forms/AddTeamWorkoutForm';

const userId = '1';
const teamId = '10';

describe('<AddTeamWorkoutForm />', () => {
  it('should render activity select view when state.activity === \'\'', () => {
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    expect(wrapper.find('.modal-form').length).toBe(1);
    expect(wrapper.find('.form-title').length).toBe(1);
    expect(wrapper.find('.modal-prev').length).toBe(0);
    expect(wrapper.find('.activity-select').length).toBe(4);
    expect(wrapper.find('.form-row.activity').length).toBe(1);
    expect(wrapper.find('.form-row.type').length).toBe(0);
    expect(wrapper.find('input').length).toBe(0);
    expect(wrapper.find('.modal-close').length).toBe(1);
  });

  it('should render type select view when state.activity !== \'\'', () => {
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.setState({
      activity: 'erg',
    });

    expect(wrapper.find('.modal-prev').length).toBe(1);
    expect(wrapper.find('.activity-select').length).toBe(0);
    expect(wrapper.find('.form-row.activity').length).toBe(0);
    expect(wrapper.find('.form-row.type').length).toBe(1);
    expect(wrapper.find('.type-select').length).toBe(2);
  });

  it('should render input view when activity and type have been chosen', () => {
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    /* distance case */
    wrapper.setState({
      activity: 'erg',
      type: 'distance',
    });

    expect(wrapper.find('.form-row.type').length).toBe(0);
    expect(wrapper.find('.type-select').length).toBe(0);
    expect(wrapper.find('input.distance').length).toBe(1);
    expect(wrapper.find('.modal-submit').length).toBe(1);
    expect(wrapper.find('.status-text.error').length).toBe(0);

    /* time case */
    wrapper.setState({
      activity: 'erg',
      type: 'time',
    });

    expect(wrapper.find('input.distance').length).toBe(0);
    expect(wrapper.find('input.time').length).toBe(1);
  });

  it('should reset state appropriately when .modal-prev is clicked', () => {
    const onPrevClick = jest.spyOn(AddTeamWorkoutForm.prototype, 'onPrevClick');
    const wrapper = mount(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    /* input view case */
    wrapper.setState({
      activity: 'erg',
      type: 'time',
      timeString: 'asdf',
      timeIsValid: false,
      statusMessage: 'invalid input',
    });

    wrapper.find('.modal-prev').simulate('click');
    expect(onPrevClick).toBeCalled();
    expect(wrapper.state().type).toBe('');
    expect(wrapper.state().timeString).toBe('');
    expect(wrapper.state().timeIsValid).toBeTruthy();
    expect(wrapper.state().statusMessage).toBe('');

    /* type select view case */
    wrapper.setState({
      activity: 'erg',
    });

    wrapper.find('.modal-prev').simulate('click');
    expect(onPrevClick).toBeCalled();
    expect(wrapper.state().activity).toBe('');
  });

  it('should handle selecting \'erg\' as activity', () => {
    const onErgSelect = jest.spyOn(AddTeamWorkoutForm.prototype, 'onErgSelect');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.find('#erg-select').simulate('click');
    expect(onErgSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('erg');
    expect(wrapper.state().distUnit).toBe('m');
  });

  it('should handle selecting \'row\' as activity', () => {
    const onRowSelect = jest.spyOn(AddTeamWorkoutForm.prototype, 'onRowSelect');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.find('#row-select').simulate('click');
    expect(onRowSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('row');
    expect(wrapper.state().distUnit).toBe('m');
  });

  it('should handle selecting \'run\' as activity', () => {
    const onRunSelect = jest.spyOn(AddTeamWorkoutForm.prototype, 'onRunSelect');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.find('#run-select').simulate('click');
    expect(onRunSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('run');
    expect(wrapper.state().distUnit).toBe('mi');
  });

  it('should handle selecting \'bike\' as activity', () => {
    const onBikeSelect = jest.spyOn(AddTeamWorkoutForm.prototype, 'onBikeSelect');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.find('#bike-select').simulate('click');
    expect(onBikeSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('bike');
    expect(wrapper.state().distUnit).toBe('mi');
  });

  it('should handle selecting \'distance\' as workout type', () => {
    const onDistSelect = jest.spyOn(AddTeamWorkoutForm.prototype, 'onDistSelect');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.setState({
      activity: 'erg',
    });

    wrapper.find('.type-select.distance').simulate('click');
    expect(onDistSelect).toBeCalled();
  });

  it('should handle selecting \'time\' as workout type', () => {
    const onTimeSelect = jest.spyOn(AddTeamWorkoutForm.prototype, 'onTimeSelect');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
    />);

    wrapper.setState({
      activity: 'erg',
    });

    wrapper.find('.type-select.time').simulate('click');
    expect(onTimeSelect).toBeCalled();
  });

  it('should handle change in distance field', () => {
    const onDistanceChange = jest.spyOn(AddTeamWorkoutForm.prototype, 'onDistanceChange');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.setState({
      activity: 'erg',
      type: 'distance',
    });

    const event = {
      target: { value: '2000' },
      preventDefault: () => {},
    };

    wrapper.find('input.distance').simulate('change', event);
    expect(onDistanceChange).toBeCalled();
    expect(wrapper.state().distance).toBe('2000');
  });

  it('should handle change in time field', () => {
    const onTimeStringChange = jest.spyOn(AddTeamWorkoutForm.prototype, 'onTimeStringChange');
    const wrapper = shallow(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    wrapper.setState({
      activity: 'erg',
      type: 'time',
    });

    const event = {
      target: { value: '6:00' },
      preventDefault: () => {},
    };

    wrapper.find('input.time').simulate('change', event);
    expect(onTimeStringChange).toBeCalled();
    expect(wrapper.state().timeString).toBe('6:00');
  });

  it('should validate distance input', () => {
    const validateInput = jest.spyOn(AddTeamWorkoutForm.prototype, 'validateInput');
    const wrapper = mount(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    /* test valid input */
    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      type: 'distance',
      distance: '2000',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().statusMessage).toBe('');

    /* test invalid input */
    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      type: 'distance',
      distance: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().distanceIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('The input parameter is invalid.');
  });

  it('should validate time input', () => {
    const validateInput = jest.spyOn(AddTeamWorkoutForm.prototype, 'validateInput');
    const wrapper = mount(<AddTeamWorkoutForm
      userId={userId}
      teamId={teamId}
    />);

    /* test valid input */
    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      type: 'time',
      timeString: '6:00',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().statusMessage).toBe('');

    /* test invalid input */
    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      type: 'time',
      timeString: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().timeIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('The input parameter is invalid.');
  });

  it('should handle onSubmit for valid input by adding team workout and closing modal', async () => {
    const onSubmit = jest.spyOn(AddTeamWorkoutForm.prototype, 'onSubmit');
    const addTeamWorkout = jest.fn(() => true);
    const onModalClose = jest.fn();
    const wrapper = mount(<AddTeamWorkoutForm
      addTeamWorkout={addTeamWorkout}
      onModalClose={onModalClose}
      userId={userId}
      teamId={teamId}
    />);

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      type: 'time',
      timeString: '6:00',
    });
    wrapper.find('.modal-form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(addTeamWorkout).toBeCalled();
    const data = await addTeamWorkout();
    expect(data).toBeTruthy();
    expect(onModalClose).toBeCalled();
  });

  it('should handle onSubmit for invalid input by not adding team workout and not closing modal for valid input', async () => {
    const onSubmit = jest.spyOn(AddTeamWorkoutForm.prototype, 'onSubmit');
    const addTeamWorkout = jest.fn(() => true);
    const onModalClose = jest.fn();
    const wrapper = mount(<AddTeamWorkoutForm
      addTeamWorkout={addTeamWorkout}
      onModalClose={onModalClose}
      userId={userId}
      teamId={teamId}
    />);

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      type: 'time',
      timeString: 'asdf',
    });
    wrapper.find('.modal-form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(addTeamWorkout).not.toBeCalled();
    expect(onModalClose).not.toBeCalled();
  });

  it('should close modal on .modal-close click', () => {
    const onModalClose = jest.fn();
    const wrapper = shallow(<AddTeamWorkoutForm
      onModalClose={onModalClose}
      userId={userId}
      teamId={teamId}
    />);

    wrapper.find('.modal-close').simulate('click');
    expect(onModalClose).toBeCalled();
  });
});
