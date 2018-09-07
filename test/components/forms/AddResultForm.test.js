import React from 'react';
import { shallow, mount } from 'enzyme';
import AddResultForm from '../../../src/components/forms/AddResultForm';

const distanceTeamWorkout = {
  _id: 1,
  type: 'distance',
  distance: 2000,
  distUnit: 'm',
  activity: 'erg',
};

const timeTeamWorkout = {
  _id: 2,
  type: 'time',
  time: 36000,
  distUnit: 'mi',
  activity: 'bike',
};

const queryResults = [
  {
    name: 'Athlete 1',
  },
];

describe('<AddResultForm />', () => {
  it('should render expected elements with empty queryResults', () => {
    const wrapper = shallow(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={[]}
    />);
    expect(wrapper.find('.modal-form').length).toBe(1);
    expect(wrapper.find('.h1').length).toBe(1);
    expect(wrapper.find('input.athlete-name').length).toBe(1);
    expect(wrapper.find('option').length).toBe(0);
    expect(wrapper.find('input.distance').length).toBe(0);
    expect(wrapper.find('input.stroke-rate').length).toBe(1);
    expect(wrapper.find('input.time').length).toBe(1);
    expect(wrapper.find('input.watts').length).toBe(0);
    expect(wrapper.find('input.heart-rate').length).toBe(1);
    expect(wrapper.find('.modal-submit').length).toBe(1);
    expect(wrapper.find('.modal-close').length).toBe(1);
  });

  it('should show list of athletes when props.queryResults.length > 0', () => {
    const wrapper = shallow(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={queryResults}
    />);
    expect(wrapper.find('option').length).toBe(1);
  });

  it('should show distance and watts fields for time/bike teamWorkout', () => {
    const wrapper = shallow(<AddResultForm
      teamWorkout={timeTeamWorkout}
      queryResults={queryResults}
    />);
    expect(wrapper.find('input.time').length).toBe(0);
    expect(wrapper.find('input.distance').length).toBe(1);
    expect(wrapper.find('input.watts').length).toBe(1);
  });

  it('should handle change in athlete name field', () => {
    const matchAthlete = jest.fn();
    const onAthleteNameChange = jest.spyOn(AddResultForm.prototype, 'onAthleteNameChange');
    const wrapper = shallow(<AddResultForm
      teamWorkout={timeTeamWorkout}
      queryResults={queryResults}
      matchAthlete={matchAthlete}
    />);

    const event = {
      target: { value: 'Athlete 1' },
      preventDefault: () => {},
    };
    wrapper.find('input.athlete-name').simulate('change', event);
    expect(onAthleteNameChange).toBeCalled();
    expect(wrapper.state().athleteName).toBe('Athlete 1');
    expect(matchAthlete).toBeCalled();


    const event2 = {
      target: { value: '' },
      preventDefault: () => {},
    };
    wrapper.find('input.athlete-name').simulate('change', event2);
    expect(onAthleteNameChange).toBeCalled();
    expect(wrapper.state().athleteName).toBe('');
  });

  it('should handle change in distance field', () => {
    const onDistanceChange = jest.spyOn(AddResultForm.prototype, 'onDistanceChange');
    const wrapper = shallow(<AddResultForm
      teamWorkout={timeTeamWorkout}
      queryResults={queryResults}
    />);
    const event = {
      target: { value: '25' },
      preventDefault: () => {},
    };
    wrapper.find('input.distance').simulate('change', event);
    expect(onDistanceChange).toBeCalled();
    expect(wrapper.state().distance).toBe('25');
  });

  it('should handle change in time field', () => {
    const onTimeStringChange = jest.spyOn(AddResultForm.prototype, 'onTimeStringChange');
    const wrapper = shallow(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={queryResults}
    />);
    const event = {
      target: { value: '5:00:00' },
      preventDefault: () => {},
    };
    wrapper.find('input.time').simulate('change', event);
    expect(onTimeStringChange).toBeCalled();
    expect(wrapper.state().timeString).toBe('5:00:00');
  });

  it('should handle change in stroke rate field', () => {
    const onStrokeRateChange = jest.spyOn(AddResultForm.prototype, 'onStrokeRateChange');
    const wrapper = shallow(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={queryResults}
    />);
    const event = {
      target: { value: '32' },
      preventDefault: () => {},
    };
    wrapper.find('input.stroke-rate').simulate('change', event);
    expect(onStrokeRateChange).toBeCalled();
    expect(wrapper.state().strokeRate).toBe('32');
  });

  it('should handle change in watts field', () => {
    const onWattsChange = jest.spyOn(AddResultForm.prototype, 'onWattsChange');
    const wrapper = shallow(<AddResultForm
      teamWorkout={timeTeamWorkout}
      queryResults={queryResults}
    />);
    const event = {
      target: { value: '243' },
      preventDefault: () => {},
    };
    wrapper.find('input.watts').simulate('change', event);
    expect(onWattsChange).toBeCalled();
    expect(wrapper.state().watts).toBe('243');
  });

  it('should handle change in heart rate field', () => {
    const onHeartRateChange = jest.spyOn(AddResultForm.prototype, 'onHeartRateChange');
    const wrapper = shallow(<AddResultForm
      teamWorkout={timeTeamWorkout}
      queryResults={queryResults}
    />);
    const event = {
      target: { value: '156' },
      preventDefault: () => {},
    };
    wrapper.find('input.heart-rate').simulate('change', event);
    expect(onHeartRateChange).toBeCalled();
    expect(wrapper.state().avgHR).toBe('156');
  });

  it('should validate input for timeString, strokeRate, and avgHR fields', () => {
    const validateInput = jest.spyOn(AddResultForm.prototype, 'validateInput');
    const wrapper = mount(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={queryResults}
    />);

    // test valid input
    wrapper.setState({
      timeString: '6:18',
      strokeRate: '32',
      avgHR: '193',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().statusMessage).toBe('');

    // test invalid time input
    wrapper.setState({
      timeString: 'asdf',
      strokeRate: '32',
      avgHR: '193',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().timeIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');

    // test invalid stroke rate input
    wrapper.setState({
      timeString: '6:18',
      strokeRate: 'asdf',
      avgHR: '193',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().strokeRateIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');

    // test invalid heart rate input
    wrapper.setState({
      timeString: '6:18',
      strokeRate: '32',
      avgHR: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().avgHRIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
  });

  it('should validate input for distance and watts fields', () => {
    const validateInput = jest.spyOn(AddResultForm.prototype, 'validateInput');
    const wrapper = mount(<AddResultForm
      teamWorkout={timeTeamWorkout}
      queryResults={queryResults}
    />);

    // test valid input
    wrapper.setState({
      distance: '25',
      timeString: '6:18',
      strokeRate: '32',
      avgHR: '193',
      watts: '243',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().statusMessage).toBe('');

    // test invalid distance input
    wrapper.setState({
      distance: 'asdf',
      timeString: '6:18',
      strokeRate: '32',
      avgHR: '193',
      watts: '243',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().distanceIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');

    // test invalid watts input
    wrapper.setState({
      distance: '25',
      timeString: '6:18',
      strokeRate: '32',
      avgHR: '193',
      watts: 'asdf',
    });
    wrapper.instance().validateInput();
    expect(validateInput).toBeCalled();
    expect(wrapper.state().wattsIsValid).toBeFalsy();
    expect(wrapper.state().statusMessage).toBe('One or more input parameters are invalid.');
    expect(wrapper.find('.status-text.error').length).toBe(1);
  });

  it('should handle onSubmit for valid input by adding result and closing modal', async () => {
    const onSubmit = jest.spyOn(AddResultForm.prototype, 'onSubmit');
    const addResult = jest.fn(() => true);
    const onModalClose = jest.fn();
    const wrapper = mount(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={queryResults}
      addResult={addResult}
      onModalClose={onModalClose}
    />);

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      athleteName: 'Athlete 1',
      distance: '25',
      timeString: '6:18',
      strokeRate: '32',
      avgHR: '193',
      watts: '243',
    });

    wrapper.find('.modal-form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(addResult).toBeCalled();
    const data = await addResult();
    expect(data).toBeTruthy();
    expect(onModalClose).toBeCalled();
  });

  it('should not add result or close modal when input fails validation check', () => {
    const onSubmit = jest.spyOn(AddResultForm.prototype, 'onSubmit');
    const addResult = jest.fn(() => true);
    const onModalClose = jest.fn();
    const wrapper = mount(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={queryResults}
      addResult={addResult}
      onModalClose={onModalClose}
    />);

    const event = {
      preventDefault: () => {},
    };

    wrapper.setState({
      athleteName: 'Athlete 1',
      distance: 'asdf',
      timeString: '6:00',
      strokeRate: '',
      watts: '',
      avgHR: '',
    });
    wrapper.find('.modal-form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(addResult).not.toBeCalled();
    expect(onModalClose).not.toBeCalled();
  });

  it('should close modal on .modal-close click', () => {
    const onModalClose = jest.fn();
    const wrapper = shallow(<AddResultForm
      teamWorkout={distanceTeamWorkout}
      queryResults={queryResults}
      onModalClose={onModalClose}
    />);

    wrapper.find('.modal-close').simulate('click');
    expect(onModalClose).toBeCalled();
  });
});
