import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import TeamWorkoutPost from '../../src/components/TeamWorkoutPost';

const distanceTeamWorkout = {
  _id: '1',
  type: 'distance',
  activity: 'erg',
  distance: 2000,
  distUnit: 'm',
  date: Date.now(),
};

const timeTeamWorkout = {
  _id: '2',
  type: 'time',
  activity: 'bike',
  timeString: '1:00:00',
  date: Date.now(),
};

describe('<TeamWorkoutPost />', () => {
  it('should render expected elements in view mode', () => {
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />);

    expect(wrapper.find('.team-workout-post').length).toBe(1);
    expect(wrapper.find('.header').length).toBe(1);
    expect(wrapper.find('.profile-link').length).toBe(1);
    expect(wrapper.find('.content').length).toBe(1);
    expect(wrapper.find('.distance').length).toBe(1);
    expect(wrapper.find('#result-modal-button').length).toBe(1);
    expect(wrapper.find('#view-result-modal-button').length).toBe(1);
    expect(wrapper.find('.footer').length).toBe(1);
    expect(wrapper.find('.fa-edit').length).toBe(1);
    expect(wrapper.find('.fa-trash').length).toBe(1);
  });

  it('should render expected elements in edit mode', () => {
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />);

    wrapper.setState({ isEditing: true });

    expect(wrapper.find('.team-workout-post.edit').length).toBe(1);
    expect(wrapper.find('input.distance').length).toBe(1);
    expect(wrapper.find('select').length).toBe(2);
    expect(wrapper.find('.workout-edit-cancel').length).toBe(1);
    expect(wrapper.find('.workout-edit-submit').length).toBe(1);
  });

  it('should handle click on #result-modal-button', () => {
    const onRecordClick = jest.spyOn(TeamWorkoutPost.prototype, 'onRecordClick');
    const onAddResultClick = jest.fn();
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      onAddResultClick={onAddResultClick}
      isCoach
    />);

    wrapper.find('#result-modal-button').simulate('click');
    expect(onRecordClick).toBeCalled();
    expect(onAddResultClick).toBeCalled();
  });

  it('should handle click on .fa-edit', () => {
    const onEditClick = jest.spyOn(TeamWorkoutPost.prototype, 'onEditClick');
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />);

    wrapper.find('.fa-edit').simulate('click');
    expect(onEditClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeTruthy();
  });

  it('should handle click on .fa-trash', () => {
    const onDeleteClick = jest.spyOn(TeamWorkoutPost.prototype, 'onDeleteClick');
    const deleteTeamWorkout = jest.fn();
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      deleteTeamWorkout={deleteTeamWorkout}
      isCoach
    />);

    wrapper.find('.fa-trash').simulate('click');
    expect(onDeleteClick).toBeCalled();
    expect(deleteTeamWorkout).toBeCalled();
  });

  it('should handle click on #view-result-modal-button', () => {
    const onViewClick = jest.spyOn(TeamWorkoutPost.prototype, 'onViewClick');
    const onViewResultsClick = jest.fn();
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      onViewResultsClick={onViewResultsClick}
      isCoach
    />);

    wrapper.find('#view-result-modal-button').simulate('click');
    expect(onViewClick).toBeCalled();
    expect(onViewResultsClick).toBeCalled();
  });

  it('should handle change in activity', () => {
    const onActivityChange = jest.spyOn(TeamWorkoutPost.prototype, 'onActivityChange');
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />);

    const event = {
      target: { value: 'row' },
    };

    wrapper.setState({ isEditing: true });
    wrapper.find('select.activity').simulate('change', event);
    expect(onActivityChange).toBeCalled();
    expect(wrapper.state().activity).toBe('row');
  });

  it('should handle change in distance', () => {
    const onDistanceChange = jest.spyOn(TeamWorkoutPost.prototype, 'onDistanceChange');
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />);

    const event = {
      target: { value: '2500' },
    };

    wrapper.setState({ isEditing: true });
    wrapper.find('input.distance').simulate('change', event);
    expect(onDistanceChange).toBeCalled();
    expect(wrapper.state().distance).toBe('2500');
  });

  it('should handle change in distUnit', () => {
    const onDistUnitChange = jest.spyOn(TeamWorkoutPost.prototype, 'onDistUnitChange');
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />);

    const event = {
      target: { value: 'km' },
    };

    wrapper.setState({ isEditing: true });
    wrapper.find('select.dist-unit').simulate('change', event);
    expect(onDistUnitChange).toBeCalled();
    expect(wrapper.state().distUnit).toBe('km');
  });

  it('should handle change in timeString', () => {
    const onTimeStringChange = jest.spyOn(TeamWorkoutPost.prototype, 'onTimeStringChange');
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={timeTeamWorkout}
      isCoach
    />);

    const event = {
      target: { value: '1:30:00' },
    };

    wrapper.setState({ isEditing: true });
    wrapper.find('input.time-string').simulate('change', event);
    expect(onTimeStringChange).toBeCalled();
    expect(wrapper.state().timeString).toBe('1:30:00');
  });

  it('should handle click on .workout-edit-cancel for distance workout', () => {
    const onCancelClick = jest.spyOn(TeamWorkoutPost.prototype, 'onCancelClick');
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />);

    wrapper.setState({
      isEditing: true,
      distance: '2500',
      distUnit: 'km',
      statusMessage: 'invalid input',
      distanceIsValid: false,
      timeIsValid: false,
    });
    wrapper.find('.workout-edit-cancel').simulate('click');
    expect(onCancelClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeFalsy();
    expect(wrapper.state().distance).toBe(2000);
    expect(wrapper.state().distUnit).toBe('m');
    expect(wrapper.state().timeString).toBe('');
    expect(wrapper.state().statusMessage).toBe('');
    expect(wrapper.state().distanceIsValid).toBeTruthy();
    expect(wrapper.state().timeIsValid).toBeTruthy();
  });

  it('should handle click on .workout-edit-cancel for time workout', () => {
    const onCancelClick = jest.spyOn(TeamWorkoutPost.prototype, 'onCancelClick');
    const wrapper = shallow(<TeamWorkoutPost
      teamWorkout={timeTeamWorkout}
      isCoach
    />);

    wrapper.setState({
      isEditing: true,
      timeString: '1:30:00',
    });
    wrapper.find('.workout-edit-cancel').simulate('click');
    expect(onCancelClick).toBeCalled();
    expect(wrapper.state().isEditing).toBeFalsy();
    expect(wrapper.state().distance).toBe('');
    expect(wrapper.state().timeString).toBe('1:00:00');
  });

  it('should validate distance input for edit form', () => {
    const validateInput = jest.spyOn(TeamWorkoutPost.prototype, 'validateInput');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      isCoach
    />, options.get());

    /* validate proper distance input */
    wrapper.setState({
      isEditing: true,
      distance: '2500',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().distanceIsValid).toBeTruthy();

    /* validate improper distance input */
    wrapper.setState({
      distance: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().distanceIsValid).toBeFalsy();
    wrapper.update();
    expect(wrapper.find('input.distance.invalid').length).toBe(1);
  });

  it('should validate timeString input for edit form', () => {
    const validateInput = jest.spyOn(TeamWorkoutPost.prototype, 'validateInput');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<TeamWorkoutPost
      teamWorkout={timeTeamWorkout}
      isCoach
    />, options.get());

    /* validate proper timeString input */
    wrapper.setState({
      isEditing: true,
      timeString: '1:10:00',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().timeIsValid).toBeTruthy();

    /* validate improper timeString input */
    wrapper.setState({
      timeString: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().timeIsValid).toBeFalsy();
    wrapper.update();
    expect(wrapper.find('input.time-string.invalid').length).toBe(1);
  });

  it('should updateTeamWorkout() and exit edit mode when valid input is submitted', async () => {
    const onSubmit = jest.spyOn(TeamWorkoutPost.prototype, 'onSubmit');
    const validateInput = jest.spyOn(TeamWorkoutPost.prototype, 'validateInput');
    const updateTeamWorkout = jest.fn(() => true);
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<TeamWorkoutPost
      teamWorkout={timeTeamWorkout}
      updateTeamWorkout={updateTeamWorkout}
      isCoach
    />, options.get());

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      isEditing: true,
      timeString: '1:30:00',
    });

    wrapper.find('.team-workout-post.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(validateInput).toBeCalled();
    expect(updateTeamWorkout).toBeCalled();
    const data = await updateTeamWorkout;
    expect(data).toBeTruthy();
    expect(wrapper.state().isEditing).toBeFalsy();
  });

  it('should not updateTeamWorkout() or exit edit mode when invalid input is submitted', async () => {
    const onSubmit = jest.spyOn(TeamWorkoutPost.prototype, 'onSubmit');
    const validateInput = jest.spyOn(TeamWorkoutPost.prototype, 'validateInput');
    const updateTeamWorkout = jest.fn(() => true);
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<TeamWorkoutPost
      teamWorkout={distanceTeamWorkout}
      updateTeamWorkout={updateTeamWorkout}
      isCoach
    />, options.get());

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      isEditing: true,
      distance: 'asdf',
    });

    wrapper.find('.team-workout-post.edit').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(validateInput).toBeCalled();
    expect(updateTeamWorkout).not.toBeCalled();
    expect(wrapper.state().isEditing).toBeTruthy();
    expect(wrapper.state().distanceIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    wrapper.update();
    expect(wrapper.find('.status-text.error').length).toBe(1);
  });
});
