import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { SignUp, mapStateToProps } from '../../src/containers/SignUp';

describe('<SignUp />', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<SignUp />);

    expect(wrapper.find('.sign-up-container').length).toBe(1);
    expect(wrapper.find('.line').length).toBe(1);
    expect(wrapper.find('.info-box').length).toBe(1);
  });

  it('should redirect when isAuthenticated', () => {
    const history = {
      replace: jest.fn(),
    };
    shallow(<SignUp
      history={history}
      isAuthenticated
    />);

    expect(history.replace).toBeCalled();
  });

  it('should show team name field when #btn-coach is clicked', () => {
    const onCoachSelect = jest.spyOn(SignUp.prototype, 'onCoachSelect');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp />, options.get());

    wrapper.find('#btn-coach').simulate('click');
    expect(onCoachSelect).toBeCalled();
    expect(wrapper.find('#btn-athlete.disabled').length).toBe(1);
    expect(wrapper.find('#team-name').length).toBe(1);
  });

  it('should show team code field when #btn-athlete is clicked', () => {
    const onAthleteSelect = jest.spyOn(SignUp.prototype, 'onAthleteSelect');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp />, options.get());

    wrapper.setState({ userType: 'coach' });
    wrapper.find('#btn-athlete').simulate('click');
    expect(onAthleteSelect).toBeCalled();
    expect(wrapper.find('#btn-coach.disabled').length).toBe(1);
    expect(wrapper.find('#team-code').length).toBe(1);
  });

  it('should handle change in teamCode field', () => {
    const onTeamCodeChange = jest.spyOn(SignUp.prototype, 'onTeamCodeChange');
    const checkTeamCode = jest.fn();
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp
      checkTeamCode={checkTeamCode}
    />, options.get());

    const event = {
      target: { value: 'asdf' },
    };

    wrapper.find('#team-code').simulate('change', event);
    expect(onTeamCodeChange).toBeCalled();
    expect(wrapper.state().teamCode).toBe('asdf');
    expect(checkTeamCode).toBeCalled();

    wrapper.setProps({ teamCodeIsValid: true });
    expect(wrapper.find('#team-code.valid').length).toBe(1);
  });

  it('should handle clearing of teamCode field and not call checkTeamCode()', () => {
    const onTeamCodeChange = jest.spyOn(SignUp.prototype, 'onTeamCodeChange');
    const checkTeamCode = jest.fn();
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp
      checkTeamCode={checkTeamCode}
    />, options.get());

    const event = {
      target: { value: '' },
    };

    wrapper.setState({ teamCode: 'asdf' });
    wrapper.find('#team-code').simulate('change', event);
    expect(onTeamCodeChange).toBeCalled();
    expect(wrapper.state().teamCode).toBe('');
    expect(checkTeamCode).not.toBeCalled();
  });

  it('should handle change in teamName field and show icon when props.teamNameIsAvailable', () => {
    const onTeamNameChange = jest.spyOn(SignUp.prototype, 'onTeamNameChange');
    const checkTeamName = jest.fn();
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp
      checkTeamName={checkTeamName}
    />, options.get());

    const event = {
      target: { value: 'Team 1' },
    };

    wrapper.setState({ userType: 'coach' });
    wrapper.find('#team-name').simulate('change', event);
    expect(onTeamNameChange).toBeCalled();
    expect(wrapper.state().teamName).toBe('Team 1');

    wrapper.setProps({ teamNameIsAvailable: true });
    expect(wrapper.find('#team-name.valid').length).toBe(1);
  });

  it('should handle clearing of teamName field and not call checkTeamName()', () => {
    const onTeamNameChange = jest.spyOn(SignUp.prototype, 'onTeamNameChange');
    const checkTeamName = jest.fn();
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp
      checkTeamName={checkTeamName}
    />, options.get());

    const event = {
      target: { value: '' },
    };

    wrapper.setState({ userType: 'coach', teamName: 'Team 1' });
    wrapper.find('#team-name').simulate('change', event);
    expect(onTeamNameChange).toBeCalled();
    expect(wrapper.state().teamName).toBe('');
    expect(checkTeamName).not.toBeCalled();
  });

  it('should handle change in name field', () => {
    const onNameChange = jest.spyOn(SignUp.prototype, 'onNameChange');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp />, options.get());

    const event = {
      target: { value: 'Athlete 1' },
    };

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('input.name').simulate('change', event);
    expect(onNameChange).toBeCalled();
    expect(wrapper.state().name).toBe('Athlete 1');
  });

  it('should handle change in email field', () => {
    const onEmailChange = jest.spyOn(SignUp.prototype, 'onEmailChange');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp />, options.get());

    const event = {
      target: { value: 'email@email.com' },
    };

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('input.email').simulate('change', event);
    expect(onEmailChange).toBeCalled();
    expect(wrapper.state().email).toBe('email@email.com');
  });

  it('should handle change in password field', () => {
    const onPasswordChange = jest.spyOn(SignUp.prototype, 'onPasswordChange');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp />, options.get());

    const event = {
      target: { value: 'password' },
    };

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('input.password').simulate('change', event);
    expect(onPasswordChange).toBeCalled();
    expect(wrapper.state().password).toBe('password');
  });

  it('should display credential fields when next button is clicked with valid teamCode', () => {
    const onNextClick = jest.spyOn(SignUp.prototype, 'onNextClick');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp teamCodeIsValid />, options.get());

    wrapper.setState({ teamCode: 'asdf' });
    wrapper.find('.btn-submit').simulate('click');
    expect(onNextClick).toBeCalled();
    expect(wrapper.find('input.name').length).toBe(1);
    expect(wrapper.find('input.email').length).toBe(1);
    expect(wrapper.find('input.password').length).toBe(1);
    expect(wrapper.find('.btn-submit').length).toBe(1);
    expect(wrapper.find('.btn-prev').length).toBe(1);

    /* check for .status-text */
    wrapper.setProps({ statusText: 'sign up failed' });
    expect(wrapper.find('.status-text').length).toBe(1);
  });

  it('should display credential fields when next button is clicked with valid teamName', () => {
    const onNextClick = jest.spyOn(SignUp.prototype, 'onNextClick');
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp teamNameIsAvailable />, options.get());

    wrapper.setState({ teamName: 'new team', userType: 'coach' });
    wrapper.find('.btn-submit').simulate('click');
    expect(onNextClick).toBeCalled();
    expect(wrapper.find('input.name').length).toBe(1);
    expect(wrapper.find('input.email').length).toBe(1);
    expect(wrapper.find('input.password').length).toBe(1);
    expect(wrapper.find('.btn-submit').length).toBe(1);
    expect(wrapper.find('.btn-prev').length).toBe(1);
  });

  it('should display initial form view when .btn-prev is clicked in credential form view', () => {
    const onBackClick = jest.spyOn(SignUp.prototype, 'onBackClick');
    const resetAuth = jest.fn();
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp teamCodeIsValid resetAuth={resetAuth} />, options.get());

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('.btn-prev').simulate('click');
    expect(onBackClick).toBeCalled();
    expect(resetAuth).toBeCalled();
    expect(wrapper.find('#team-code').length).toBe(1);
  });

  it('should handle athlete signup submission', () => {
    const onSubmit = jest.spyOn(SignUp.prototype, 'onSubmit');
    const signUpAthlete = jest.fn();
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp
      signUpAthlete={signUpAthlete}
    />, options.get());

    const event = {
      preventDefault: () => {},
      stopPropagation: () => {},
    };

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(signUpAthlete).toBeCalled();
  });

  it('should handle coach signup submission', () => {
    const onSubmit = jest.spyOn(SignUp.prototype, 'onSubmit');
    const signUpCoach = jest.fn();
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<SignUp
      signUpCoach={signUpCoach}
    />, options.get());

    const event = {
      preventDefault: () => {},
      stopPropagation: () => {},
    };

    wrapper.setState({ firstStepComplete: true, userType: 'coach' });
    wrapper.find('form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(signUpCoach).toBeCalled();
  });

  it('should handle mapStateToProps', () => {
    const state = {
      auth: {
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: null,
      },
      team: {
        teamNameIsAvailable: false,
        teamCodeIsValid: false,
      },
    };

    expect(mapStateToProps(state)).toEqual(
      {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        teamNameIsAvailable: state.team.teamNameIsAvailable,
        teamCodeIsValid: state.team.teamCodeIsValid,
      },
    );
  });
});
