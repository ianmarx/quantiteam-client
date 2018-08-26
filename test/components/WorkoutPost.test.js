import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import WorkoutPost from '../../src/components/WorkoutPost';

const workout = {
  activity: 'erg',
  _creator: '1',
  creatorName: 'Athlete 1',
  distance: 2000,
  timeString: '6:04',
  splitString: '1:31.0',
  strokeRate: 32,
  avgHR: 193,
};

const currentUserId = '1';

describe('<WorkoutPost />', () => {
  it('should render expected elements for view mode', () => {
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId={currentUserId}
    />);

    expect(wrapper.find('.workout-post').length).toBe(1);
    expect(wrapper.find('.content').length).toBe(1);
    expect(wrapper.find('.distance').length).toBe(1);
    expect(wrapper.find('.time-string').length).toBe(1);
    expect(wrapper.find('.split-string').length).toBe(1);
    expect(wrapper.find('.fa-angle-double-down').length).toBe(1);
    expect(wrapper.find('.fa-edit').length).toBe(1);
    expect(wrapper.find('.fa-trash').length).toBe(1);

    wrapper.setState({ showingDetails: true });
    expect(wrapper.find('.fa-angle-double-up').length).toBe(1);
    expect(wrapper.find('.stroke-rate').length).toBe(1);
    expect(wrapper.find('.heart-rate').length).toBe(1);
  });

  it('should hide edit/delete icons when currentUserId !== workout._creator', () => {
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId='2'
    />);

    expect(wrapper.find('.fa-edit').length).toBe(0);
    expect(wrapper.find('.fa-trash').length).toBe(0);
  });

  it('should render expected elements when state.isEditing', () => {
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId={currentUserId}
    />);

    wrapper.setState({ isEditing: true });

    expect(wrapper.find('.workout-post.edit').length).toBe(1);
    expect(wrapper.find('.content').length).toBe(1);
    expect(wrapper.find('.footer').length).toBe(1);
    expect(wrapper.find('input.distance').length).toBe(1);
    expect(wrapper.find('input.time').length).toBe(1);
    expect(wrapper.find('input.stroke-rate').length).toBe(1);
    expect(wrapper.find('input.heart-rate').length).toBe(1);
    expect(wrapper.find('input.watts').length).toBe(0);
    expect(wrapper.find('.workout-edit-cancel').length).toBe(1);
    expect(wrapper.find('.workout-edit-submit').length).toBe(1);
    expect(wrapper.find('.status-text.error').length).toBe(0);

    /* check for error message */
    wrapper.setState({ statusMessage: 'invalid input' });
    expect(wrapper.find('.status-text.error').length).toBe(1);
  });

  it('should render watts field for bike workout', () => {
    const bikeWorkout = {
      activity: 'bike',
      watts: 254,
      distance: 25,
      timeString: '1:00:00',
    };

    const wrapper = shallow(<WorkoutPost
      workout={bikeWorkout}
      currentUserId={currentUserId}
    />);

    wrapper.setState({ showingDetails: true });
    expect(wrapper.find('div.watts').length).toBe(1);
    wrapper.setState({ isEditing: true });
    expect(wrapper.find('input.watts').length).toBe(1);
  });

  it('should enter edit mode on .fa-edit click', () => {
    const onEditClick = jest.spyOn(WorkoutPost.prototype, 'onEditClick');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId={currentUserId}
    />);

    wrapper.find('.fa-edit').simulate('click');
    expect(onEditClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeTruthy();
  });

  it('should reset state on .workout-edit-cancel click', () => {
    const onCancelClick = jest.spyOn(WorkoutPost.prototype, 'onCancelClick');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId={currentUserId}
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

  it('should show details on .fa-angle-double-down click', () => {
    const onShowDetailsClick = jest.spyOn(WorkoutPost.prototype, 'onShowDetailsClick');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId={currentUserId}
    />);

    wrapper.find('.fa-angle-double-down').simulate('click');
    expect(onShowDetailsClick).toBeCalled();
    expect(wrapper.state().showingDetails).toBeTruthy();
  });

  it('should hide details on .fa-angle-double-up click', () => {
    const onHideDetailsClick = jest.spyOn(WorkoutPost.prototype, 'onHideDetailsClick');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId={currentUserId}
    />);

    wrapper.setState({ showingDetails: true });
    wrapper.find('.fa-angle-double-up').simulate('click');
    expect(onHideDetailsClick).toBeCalled();
    expect(wrapper.state().showingDetails).toBeFalsy();
  });

  it('should handle onCancelClick when props.workout has no strokeRate or avgHR', () => {
    const bikeWorkout = {
      activity: 'bike',
      watts: 320,
      distance: 25,
      timeString: 3600,
    };
    const onCancelClick = jest.spyOn(WorkoutPost.prototype, 'onCancelClick');
    const wrapper = shallow(<WorkoutPost
      workout={bikeWorkout}
      currentUserId={currentUserId}
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

  it('should call deleteWorkout() on .fa-trash click', () => {
    const onDeleteClick = jest.spyOn(WorkoutPost.prototype, 'onDeleteClick');
    const deleteWorkout = jest.fn();
    const wrapper = shallow(<WorkoutPost
      workout={workout}
      currentUserId={currentUserId}
      deleteWorkout={deleteWorkout}
    />);

    wrapper.find('.fa-trash').simulate('click');
    expect(onDeleteClick).toBeCalled();
    expect(deleteWorkout).toBeCalled();
  });

  it('should handle change in distance field', () => {
    const onDistanceChange = jest.spyOn(WorkoutPost.prototype, 'onDistanceChange');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
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
    const onTimeStringChange = jest.spyOn(WorkoutPost.prototype, 'onTimeStringChange');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
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
    const onStrokeRateChange = jest.spyOn(WorkoutPost.prototype, 'onStrokeRateChange');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
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
    const onWattsChange = jest.spyOn(WorkoutPost.prototype, 'onWattsChange');
    const bikeWorkout = {
      activity: 'bike',
      watts: null,
      distance: 25,
      timeString: 3600,
    };
    const wrapper = shallow(<WorkoutPost
      workout={bikeWorkout}
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
    const onHeartRateChange = jest.spyOn(WorkoutPost.prototype, 'onHeartRateChange');
    const wrapper = shallow(<WorkoutPost
      workout={workout}
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

  it('should validate input', () => {
    const validateInput = jest.spyOn(WorkoutPost.prototype, 'validateInput');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<WorkoutPost
      workout={workout}
    />, options.get());

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

  it('should handle invalid watts input', () => {
    const bikeWorkout = {
      activity: 'bike',
      watts: null,
      distance: 25,
      timeString: '1:00:00',
    };
    const validateInput = jest.spyOn(WorkoutPost.prototype, 'validateInput');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<WorkoutPost
      workout={bikeWorkout}
    />, options.get());

    // test invalid watts input
    wrapper.setState({
      isEditing: true,
      watts: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().wattsIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    wrapper.update();
    expect(wrapper.find('input.watts.invalid').length).toBe(1);
  });

  it('should handle onSubmit for valid input by updating workout and exiting edit mode', async () => {
    const onSubmit = jest.spyOn(WorkoutPost.prototype, 'onSubmit');
    const updateWorkout = jest.fn(() => true);
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<WorkoutPost
      workout={workout}
      updateWorkout={updateWorkout}
      currentUserId={currentUserId}
    />, options.get());

    wrapper.setState({ isEditing: true, distance: '2500' });

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('.workout-post.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(updateWorkout).toBeCalled();
    const data = await updateWorkout();
    expect(data).toBeTruthy();
    expect(wrapper.state().isEditing).toBeFalsy();
  });

  it('should not updateWorkout or exit edit mode for invalid input', async () => {
    const onSubmit = jest.spyOn(WorkoutPost.prototype, 'onSubmit');
    const updateWorkout = jest.fn(() => true);
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<WorkoutPost
      workout={workout}
    />, options.get());

    wrapper.setState({ isEditing: true, distance: 'asdf' });

    const event = {
      preventDefault: () => {},
    };

    wrapper.find('.workout-post.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(updateWorkout).not.toBeCalled();
    expect(wrapper.state().isEditing).toBeTruthy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
  });
});
