import React from 'react';
import { shallow, mount } from 'enzyme';
import AddWorkoutForm from '../../../src/components/forms/AddWorkoutForm';

const userId = '1';
const userName = 'Athlete 1';

describe('<AddWorkoutForm />', () => {
  it('should render activity select view when state.activity is blank', () => {
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    expect(wrapper.find('.modal-form.activity').length).toBe(1);
    expect(wrapper.find('.h1').length).toBe(1);
    expect(wrapper.find('button').length).toBe(5);
    expect(wrapper.find('input').length).toBe(0);
    expect(wrapper.find('.modal-submit').length).toBe(0);
    expect(wrapper.find('.modal-close').length).toBe(1);
  });

  it('should render form input view when state.activity !== \'\'', () => {
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
      statusText='Adding workout...'
    />);

    wrapper.setState({
      activity: 'erg',
    });

    expect(wrapper.find('.modal-prev').length).toBe(1);
    expect(wrapper.find('input.distance').length).toBe(1);
    expect(wrapper.find('input.time').length).toBe(1);
    expect(wrapper.find('input.stroke-rate').length).toBe(1);
    expect(wrapper.find('input.heart-rate').length).toBe(1);
    expect(wrapper.find('input.watts').length).toBe(0);
    expect(wrapper.find('.modal-submit').length).toBe(1);
    expect(wrapper.find('.status-text').length).toBe(1);

    // check for watts field
    wrapper.setState({
      activity: 'bike',
    });
    expect(wrapper.find('input.stroke-rate').length).toBe(0);
    expect(wrapper.find('input.watts').length).toBe(1);
  });

  it('should reset state when .modal-prev is clicked', () => {
    const onPrevClick = jest.spyOn(AddWorkoutForm.prototype, 'onPrevClick');
    const wrapper = mount(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'erg',
      distance: '2000',
      strokeRate: '32',
      avgHR: '193',
      distUnit: 'm',
      timeString: 'asdf',
      timeIsValid: false,
      statusMessage: 'invalid input',
    });

    wrapper.find('.modal-prev').simulate('click');
    expect(onPrevClick).toBeCalled();
    expect(wrapper.state().activity).toBe('');
    expect(wrapper.state().distance).toBe('');
    expect(wrapper.state().strokeRate).toBe('');
    expect(wrapper.state().avgHR).toBe('');
    expect(wrapper.state().distUnit).toBe('');
    expect(wrapper.state().timeString).toBe('');
    expect(wrapper.state().timeIsValid).toBeTruthy();
    expect(wrapper.state().statusMessage).toBe('');
  });

  it('should handle selecting \'erg\' as activity', () => {
    const onErgSelect = jest.spyOn(AddWorkoutForm.prototype, 'onErgSelect');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.find('.btn-select.erg').simulate('click');
    expect(onErgSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('erg');
    expect(wrapper.state().distUnit).toBe('m');
  });

  it('should handle selecting \'row\' as activity', () => {
    const onRowSelect = jest.spyOn(AddWorkoutForm.prototype, 'onRowSelect');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.find('.btn-select.row').simulate('click');
    expect(onRowSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('row');
    expect(wrapper.state().distUnit).toBe('m');
  });

  it('should handle selecting \'run\' as activity', () => {
    const onRunSelect = jest.spyOn(AddWorkoutForm.prototype, 'onRunSelect');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.find('.btn-select.run').simulate('click');
    expect(onRunSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('run');
    expect(wrapper.state().distUnit).toBe('mi');
  });

  it('should handle selecting \'bike\' as activity', () => {
    const onBikeSelect = jest.spyOn(AddWorkoutForm.prototype, 'onBikeSelect');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.find('.btn-select.bike').simulate('click');
    expect(onBikeSelect).toBeCalled();
    expect(wrapper.state().activity).toBe('bike');
    expect(wrapper.state().distUnit).toBe('mi');
  });

  it('should handle change in distance field', () => {
    const onDistanceChange = jest.spyOn(AddWorkoutForm.prototype, 'onDistanceChange');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'erg',
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
    const onTimeStringChange = jest.spyOn(AddWorkoutForm.prototype, 'onTimeStringChange');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'erg',
    });

    const event = {
      target: { value: '6:00' },
      preventDefault: () => {},
    };

    wrapper.find('input.time').simulate('change', event);
    expect(onTimeStringChange).toBeCalled();
    expect(wrapper.state().timeString).toBe('6:00');
  });

  it('should handle change in stroke rate field', () => {
    const onStrokeRateChange = jest.spyOn(AddWorkoutForm.prototype, 'onStrokeRateChange');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'erg',
    });

    const event = {
      target: { value: '32' },
      preventDefault: () => {},
    };

    wrapper.find('input.stroke-rate').simulate('change', event);
    expect(onStrokeRateChange).toBeCalled();
    expect(wrapper.state().strokeRate).toBe('32');
  });

  it('should handle change in watts field', () => {
    const onWattsChange = jest.spyOn(AddWorkoutForm.prototype, 'onWattsChange');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'bike',
    });

    const event = {
      target: { value: '243' },
      preventDefault: () => {},
    };

    wrapper.find('input.watts').simulate('change', event);
    expect(onWattsChange).toBeCalled();
    expect(wrapper.state().watts).toBe('243');
  });

  it('should handle change in heart rate field', () => {
    const onHeartRateChange = jest.spyOn(AddWorkoutForm.prototype, 'onHeartRateChange');
    const wrapper = shallow(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'bike',
    });

    const event = {
      target: { value: '156' },
      preventDefault: () => {},
    };

    wrapper.find('input.heart-rate').simulate('change', event);
    expect(onHeartRateChange).toBeCalled();
    expect(wrapper.state().avgHR).toBe('156');
  });

  it('should validate correctly formatted input', () => {
    const validateInput = jest.spyOn(AddWorkoutForm.prototype, 'validateInput');
    const wrapper = mount(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      distance: '2000',
      timeString: '6:00',
      strokeRate: '32',
      avgHR: '193',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().statusMessage).toBe('');
  });

  it('should invalidate incorrectly formatted input', () => {
    const validateInput = jest.spyOn(AddWorkoutForm.prototype, 'validateInput');
    const wrapper = mount(<AddWorkoutForm
      userId={userId}
      userName={userName}
    />);

    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      distance: 'asdf',
      timeString: 'asdf',
      strokeRate: 'asdf',
      avgHR: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().distanceIsValid).toBeFalsy();
    expect(wrapper.state().strokeRateIsValid).toBeFalsy();
    expect(wrapper.state().timeIsValid).toBeFalsy();
    expect(wrapper.state().avgHRIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');

    wrapper.update(); // force a re-render
    expect(wrapper.find('.status-text.error').length).toBe(1);

    /* check watts validation */
    wrapper.setState({
      activity: 'bike',
      distUnit: 'mi',
      distance: '25',
      timeString: '1:00:00',
      watts: 'asdf',
      avgHR: '165',
      statusMessage: '',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state.wattsIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
  });

  it('should handle onSubmit for valid input by adding workout and closing modal when workoutIsAdded', async () => {
    const addWorkout = jest.fn(() => true);
    const onSubmit = jest.spyOn(AddWorkoutForm.prototype, 'onSubmit');
    const onModalClose = jest.fn();
    const wrapper = mount(<AddWorkoutForm
      addWorkout={addWorkout}
      onModalClose={onModalClose}
      userId={userId}
      userName={userName}
      workoutIsAdded
    />);

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      distance: '2000',
      timeString: '6:00',
    });
    wrapper.find('.modal-form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(addWorkout).toBeCalled();
    const data = await addWorkout();
    expect(data).toBeTruthy();
    expect(onModalClose).toBeCalled();
  });

  it('handle onSubmit for valid input by adding workout, but not closing modal when !workoutIsAdded', async () => {
    const addWorkout = jest.fn(() => true);
    const onSubmit = jest.spyOn(AddWorkoutForm.prototype, 'onSubmit');
    const onModalClose = jest.fn();
    const wrapper = mount(<AddWorkoutForm
      addWorkout={addWorkout}
      onModalClose={onModalClose}
      userId={userId}
      userName={userName}
      workoutIsAdded={false}
    />);

    const event = {
      preventDefault: () => {},
    };


    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      distance: '2000',
      timeString: '6:00',
    });
    wrapper.find('.modal-form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(addWorkout).toBeCalled();
    const data = await addWorkout();
    expect(data).toBeTruthy();
    expect(onModalClose).not.toBeCalled();
  });

  it('should invalidate incorrect input in onSubmit', () => {
    const addWorkout = jest.fn(() => true);
    const onSubmit = jest.spyOn(AddWorkoutForm.prototype, 'onSubmit');
    const onModalClose = jest.fn();
    const wrapper = mount(<AddWorkoutForm
      addWorkout={addWorkout}
      onModalClose={onModalClose}
      userId={userId}
      userName={userName}
      workoutIsAdded={false}
    />);

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      activity: 'erg',
      distUnit: 'm',
      distance: '2000',
      timeString: 'asdf',
    });
    wrapper.find('.modal-form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(addWorkout).not.toBeCalled();
    expect(onModalClose).not.toBeCalled();
  });

  it('should close modal on .modal-close click', () => {
    const onModalClose = jest.fn();
    const wrapper = shallow(<AddWorkoutForm
      onModalClose={onModalClose}
      userId={userId}
      userName={userName}
    />);

    wrapper.find('.modal-close').simulate('click');
    expect(onModalClose).toBeCalled();
  });
});
