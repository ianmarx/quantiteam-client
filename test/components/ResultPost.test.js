import React from 'react';
import { shallow, mount } from 'enzyme';
import ResultPost from '../../src/components/ResultPost';

const workout = {
  activity: 'erg',
  creatorName: 'Athlete 1',
  distance: 2000,
  timeString: '6:04',
  splitString: '1:31.0',
  strokeRate: 32,
  avgHR: 193,
};

describe('<ResultPost />', () => {
  it('should render expected elements for view mode when isCoach', () => {
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
      isCoach
    />);

    expect(wrapper.find('.result-post').length).toBe(1);
    expect(wrapper.find('.row-unit').length).toBe(5);
  });

  it('should render expected elements when state.isEditing', () => {
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
    />);

    wrapper.setState({ isEditing: true });

    expect(wrapper.find('.result-post.edit').length).toBe(1);
    expect(wrapper.find('input.distance').length).toBe(0);
    expect(wrapper.find('input.time').length).toBe(1);
    expect(wrapper.find('input.stroke-rate').length).toBe(1);
    expect(wrapper.find('input.heart-rate').length).toBe(1);
    expect(wrapper.find('.workout-edit-cancel').length).toBe(1);
    expect(wrapper.find('.workout-edit-submit').length).toBe(1);
    expect(wrapper.find('.status-text.error').length).toBe(0);
    expect(wrapper.find('.footer').length).toBe(2);

    /* check for error message */
    wrapper.setState({ statusMessage: 'invalid input' });
    wrapper.update();
    expect(wrapper.find('.status-text.error').length).toBe(1);
  });

  it('should render watts field for bike workouts', () => {
    const bikeWorkout = {
      activity: 'bike',
      watts: 254,
      distance: 25,
      timeString: '1:00:00',
    };

    const wrapper = shallow(<ResultPost
      workout={bikeWorkout}
      type='time'
      teamWorkoutId='1'
      isCoach
    />);

    wrapper.setState({ isEditing: true });
    expect(wrapper.find('input.watts').length).toBe(1);
  });

  it('should enter edit mode on .result-post click when props.inEditMode is true', () => {
    const onEditClick = jest.spyOn(ResultPost.prototype, 'onEditClick');
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='time'
      teamWorkoutId='1'
      isCoach
      inEditMode
    />);

    wrapper.find('.result-post').simulate('click');
    expect(onEditClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeTruthy();
  });

  it('should reset state on .workout-edit-cancel click', () => {
    const onCancelClick = jest.spyOn(ResultPost.prototype, 'onCancelClick');
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='time'
      teamWorkoutId='1'
    />);

    wrapper.setState({
      isEditing: true,
      distance: 'asdf',
      distanceIsValid: false,
      statusMessage: 'invalid input',
      strokeRate: '45',
      watts: '520',
      avgHR: '205',
    });

    wrapper.find('.workout-edit-cancel').simulate('click');
    expect(onCancelClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeFalsy();
    expect(wrapper.state().distance).toBe(2000);
    expect(wrapper.state().strokeRate).toBe(32);
    expect(wrapper.state().watts).toBe('');
    expect(wrapper.state().avgHR).toBe(193);
    expect(wrapper.state().distanceIsValid).toBeTruthy();
    expect(wrapper.state().statusMessage).toBe('');
  });

  it('should handle onCancelClick when props.workout has no strokeRate or avgHR', () => {
    const bikeWorkout = {
      activity: 'bike',
      watts: 320,
      distance: 25,
      timeString: '1:00:00',
    };
    const onCancelClick = jest.spyOn(ResultPost.prototype, 'onCancelClick');
    const wrapper = shallow(<ResultPost
      workout={bikeWorkout}
      type='time'
      teamWorkoutId='1'
    />);

    wrapper.setState({
      isEditing: true,
      distance: 'asdf',
      distanceIsValid: false,
      statusMessage: 'invalid input',
      strokeRate: '45',
      watts: '520',
      avgHR: '205',
    });

    wrapper.find('.workout-edit-cancel').simulate('click');
    expect(onCancelClick).toBeCalled();
    expect(wrapper.state().strokeRate).toBe('');
    expect(wrapper.state().watts).toBe(320);
    expect(wrapper.state().avgHR).toBe('');
  });

  it('should call deleteResult() on .btn-delete click', () => {
    const onDeleteClick = jest.spyOn(ResultPost.prototype, 'onDeleteClick');
    const deleteResult = jest.fn();
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='time'
      teamWorkoutId='1'
      deleteResult={deleteResult}
      isCoach
    />);

    wrapper.setState({ isEditing: true });

    wrapper.find('.btn-delete').simulate('click');
    expect(onDeleteClick).toBeCalled();
    expect(deleteResult).toBeCalled();
  });

  it('should handle change in distance field', () => {
    const onDistanceChange = jest.spyOn(ResultPost.prototype, 'onDistanceChange');
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='time'
      teamWorkoutId='1'
    />);

    wrapper.setState({
      isEditing: true,
    });

    const event = {
      target: { value: '2500' },
      preventDefault: () => {},
    };

    wrapper.find('input.distance').simulate('change', event);
    expect(onDistanceChange).toBeCalled();
    expect(wrapper.state().distance).toBe('2500');
  });

  it('should handle change in time field', () => {
    const onTimeStringChange = jest.spyOn(ResultPost.prototype, 'onTimeStringChange');
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
    />);

    wrapper.setState({
      isEditing: true,
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
    const onStrokeRateChange = jest.spyOn(ResultPost.prototype, 'onStrokeRateChange');
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
    />);

    wrapper.setState({
      isEditing: true,
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
    const onWattsChange = jest.spyOn(ResultPost.prototype, 'onWattsChange');
    const bikeWorkout = {
      activity: 'bike',
      watts: null,
      distance: 25,
      timeString: '1:00:00',
    };
    const wrapper = shallow(<ResultPost
      workout={bikeWorkout}
      type='distance'
      teamWorkoutId='1'
    />);

    wrapper.setState({
      isEditing: true,
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
    const onHeartRateChange = jest.spyOn(ResultPost.prototype, 'onHeartRateChange');
    const wrapper = shallow(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
    />);

    wrapper.setState({
      isEditing: true,
    });

    const event = {
      target: { value: '156' },
      preventDefault: () => {},
    };

    wrapper.find('input.heart-rate').simulate('change', event);
    expect(onHeartRateChange).toBeCalled();
    expect(wrapper.state().avgHR).toBe('156');
  });

  it('should validate input for distance workout (time, strokeRate, avgHR)', () => {
    const validateInput = jest.spyOn(ResultPost.prototype, 'validateInput');
    const wrapper = mount(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
    />);

    wrapper.setState({ isEditing: true });

    // test valid input
    wrapper.setState({
      distance: '2000',
      timeString: '6:18',
      strokeRate: '32',
      avgHR: '193',
      watts: '420',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().statusMessage).toBe('');

    // test invalid time input
    wrapper.setState({
      distance: '2000',
      timeString: 'asdf',
      strokeRate: '32',
      avgHR: '193',
      watts: '420',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().timeIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    wrapper.update();
    expect(wrapper.find('input.time.invalid').length).toBe(1);

    // test invalid stroke rate input
    wrapper.setState({
      distance: '2000',
      timeString: '6:18',
      strokeRate: 'asdf',
      avgHR: '193',
      watts: '420',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().strokeRateIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    wrapper.update();
    expect(wrapper.find('input.stroke-rate.invalid').length).toBe(1);

    // test invalid heart rate input
    wrapper.setState({
      distance: '2000',
      timeString: '6:18',
      strokeRate: '32',
      avgHR: 'asdf',
      watts: '420',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().avgHRIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    wrapper.update();
    expect(wrapper.find('input.heart-rate.invalid').length).toBe(1);
  });

  it('should handle validation for time workout (distance, watts)', () => {
    const bikeWorkout = {
      activity: 'bike',
      watts: 254,
      distance: 25,
      avgHR: 165,
      timeString: '1:00:00',
    };
    const validateInput = jest.spyOn(ResultPost.prototype, 'validateInput');
    const wrapper = mount(<ResultPost
      workout={bikeWorkout}
      type='time'
      teamWorkoutId='1'
    />);

    wrapper.setState({ isEditing: true });

    // test valid input
    wrapper.setState({
      distance: '30',
      timeString: '1:30:00',
      avgHR: '153',
      watts: '320',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().statusMessage).toBe('');

    // test invalid distance input
    wrapper.setState({
      distance: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().distanceIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    wrapper.update();
    expect(wrapper.find('input.distance.invalid').length).toBe(1);

    // test invalid watts input
    wrapper.setState({
      watts: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().wattsIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    wrapper.update();
    expect(wrapper.find('input.watts.invalid').length).toBe(1);
  });

  it('should handle onSubmit for valid input by updating result and exiting edit mode', async () => {
    const onSubmit = jest.spyOn(ResultPost.prototype, 'onSubmit');
    const updateResult = jest.fn(() => true);
    const wrapper = mount(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
      updateResult={updateResult}
    />);

    wrapper.setState({ isEditing: true, distance: '2500' });

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('.result-post.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(updateResult).toBeCalled();
    const data = await updateResult();
    expect(data).toBeTruthy();
    expect(wrapper.state().isEditing).toBeFalsy();
  });

  it('should not updateResult or exit edit mode for invalid input', async () => {
    const onSubmit = jest.spyOn(ResultPost.prototype, 'onSubmit');
    const updateResult = jest.fn(() => true);
    const wrapper = mount(<ResultPost
      workout={workout}
      type='distance'
      teamWorkoutId='1'
      updateResult={updateResult}
    />);

    wrapper.setState({ isEditing: true, distance: 'asdf' });

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('.result-post.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(updateResult).not.toBeCalled();
    expect(wrapper.state().isEditing).toBeTruthy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
  });
});
