import React from 'react';
import { shallow } from 'enzyme';
import { SignUp, mapStateToProps } from '../../src/containers/SignUp';

describe('<SignUp />', () => {
  it('should render expected elements for initial athlete form view', () => {
    const wrapper = shallow(<SignUp />);

    expect(wrapper.find('.signup-form').length).toBe(1);
    expect(wrapper.find('.button-group').length).toBe(1);
    expect(wrapper.find('button.athlete').length).toBe(1);
    expect(wrapper.find('button.coach.disabled').length).toBe(1);
    expect(wrapper.find('.team-code-input').length).toBe(1);
    expect(wrapper.find('.next-button').length).toBe(1);

    wrapper.instance().componentWillUnmount();
  });

  it('should show team name field when button.coach is clicked', () => {
    const onCoachSelect = jest.spyOn(SignUp.prototype, 'onCoachSelect');
    const wrapper = shallow(<SignUp />);

    wrapper.find('button.coach').simulate('click');
    expect(onCoachSelect).toBeCalled();
    expect(wrapper.find('button.athlete.disabled').length).toBe(1);
    expect(wrapper.find('.team-name-input').length).toBe(1);
  });

  it('should show team code field when button.athlete is clicked', () => {
    const onAthleteSelect = jest.spyOn(SignUp.prototype, 'onAthleteSelect');
    const wrapper = shallow(<SignUp />);

    wrapper.setState({ userType: 'coach' });
    wrapper.find('button.athlete').simulate('click');
    expect(onAthleteSelect).toBeCalled();
    expect(wrapper.find('button.coach.disabled').length).toBe(1);
    expect(wrapper.find('.team-code-input').length).toBe(1);
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

  it('should handle change in teamCode field and show icon when props.teamCodeIsValid', () => {
    const onTeamCodeChange = jest.spyOn(SignUp.prototype, 'onTeamCodeChange');
    const checkTeamCode = jest.fn();
    const wrapper = shallow(<SignUp
      checkTeamCode={checkTeamCode}
    />);

    const event = {
      target: { value: 'asdf' },
    };

    wrapper.find('.team-code-input').simulate('change', event);
    expect(onTeamCodeChange).toBeCalled();
    expect(wrapper.state().teamCode).toBe('asdf');
    expect(checkTeamCode).toBeCalled();

    wrapper.setProps({ teamCodeIsValid: true });
    expect(wrapper.find('.fa-stack').length).toBe(1);
  });

  it('should handle clearing of teamCode field and not call checkTeamCode()', () => {
    const onTeamCodeChange = jest.spyOn(SignUp.prototype, 'onTeamCodeChange');
    const checkTeamCode = jest.fn();
    const wrapper = shallow(<SignUp
      checkTeamCode={checkTeamCode}
    />);

    const event = {
      target: { value: '' },
    };

    wrapper.setState({ teamCode: 'asdf' });
    wrapper.find('.team-code-input').simulate('change', event);
    expect(onTeamCodeChange).toBeCalled();
    expect(wrapper.state().teamCode).toBe('');
    expect(checkTeamCode).not.toBeCalled();
  });

  it('should handle change in teamName field and show icon when props.teamNameIsAvailable', () => {
    const onTeamNameChange = jest.spyOn(SignUp.prototype, 'onTeamNameChange');
    const checkTeamName = jest.fn();
    const wrapper = shallow(<SignUp
      checkTeamName={checkTeamName}
    />);

    const event = {
      target: { value: 'Team 1' },
    };

    wrapper.setState({ userType: 'coach' });
    wrapper.find('.team-name-input').simulate('change', event);
    expect(onTeamNameChange).toBeCalled();
    expect(wrapper.state().teamName).toBe('Team 1');

    wrapper.setProps({ teamNameIsAvailable: true });
    expect(wrapper.find('.fa-stack').length).toBe(1);
  });

  it('should handle clearing of teamName field and not call checkTeamName()', () => {
    const onTeamNameChange = jest.spyOn(SignUp.prototype, 'onTeamNameChange');
    const checkTeamName = jest.fn();
    const wrapper = shallow(<SignUp
      checkTeamName={checkTeamName}
    />);

    const event = {
      target: { value: '' },
    };

    wrapper.setState({ userType: 'coach', teamName: 'Team 1' });
    wrapper.find('.team-name-input').simulate('change', event);
    expect(onTeamNameChange).toBeCalled();
    expect(wrapper.state().teamName).toBe('');
    expect(checkTeamName).not.toBeCalled();
  });

  it('should handle change in name field', () => {
    const onNameChange = jest.spyOn(SignUp.prototype, 'onNameChange');
    const wrapper = shallow(<SignUp />);

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
    const wrapper = shallow(<SignUp />);

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
    const wrapper = shallow(<SignUp />);

    const event = {
      target: { value: 'password' },
    };

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('input.password').simulate('change', event);
    expect(onPasswordChange).toBeCalled();
    expect(wrapper.state().password).toBe('password');
  });

  it('should display credential fields when .next-button is clicked with valid teamCode', () => {
    const onNextClick = jest.spyOn(SignUp.prototype, 'onNextClick');
    const wrapper = shallow(<SignUp teamCodeIsValid />);

    wrapper.setState({ teamCode: 'asdf' });
    wrapper.find('.next-button').simulate('click');
    expect(onNextClick).toBeCalled();
    expect(wrapper.find('input.name').length).toBe(1);
    expect(wrapper.find('input.email').length).toBe(1);
    expect(wrapper.find('input.password').length).toBe(1);
    expect(wrapper.find('.signup-button').length).toBe(1);
    expect(wrapper.find('.back-button').length).toBe(1);

    /* check for .status-text */
    wrapper.setProps({ statusText: 'sign up failed' });
    expect(wrapper.find('.status-text').length).toBe(1);
  });

  it('should display credential fields when .next-button is clicked with valid teamName', () => {
    const onNextClick = jest.spyOn(SignUp.prototype, 'onNextClick');
    const wrapper = shallow(<SignUp teamNameIsValid />);

    wrapper.setState({ teamCode: 'new team' });
    wrapper.find('.next-button').simulate('click');
    expect(onNextClick).toBeCalled();
    expect(wrapper.find('input.name').length).toBe(1);
    expect(wrapper.find('input.email').length).toBe(1);
    expect(wrapper.find('input.password').length).toBe(1);
    expect(wrapper.find('.signup-button').length).toBe(1);
    expect(wrapper.find('.back-button').length).toBe(1);
  });

  it('should display initial form view when .back-button is clicked in credential form view', () => {
    const onBackClick = jest.spyOn(SignUp.prototype, 'onBackClick');
    const wrapper = shallow(<SignUp teamCodeIsValid />);

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('.back-button').simulate('click');
    expect(onBackClick).toBeCalled();
    expect(wrapper.find('.team-code-input').length).toBe(1);
  });

  it('should handle athlete form submission on .signup-button click', () => {
    const onSubmit = jest.spyOn(SignUp.prototype, 'onSubmit');
    const signUpAthlete = jest.fn();
    const wrapper = shallow(<SignUp
      signUpAthlete={signUpAthlete}
    />);

    const event = {
      preventDefault: () => {},
      stopPropagation: () => {},
    };

    wrapper.setState({ firstStepComplete: true });
    wrapper.find('form').simulate('submit', event);
    expect(onSubmit).toBeCalled();
    expect(signUpAthlete).toBeCalled();
  });

  it('should handle coach form submission on .signup-button click', () => {
    const onSubmit = jest.spyOn(SignUp.prototype, 'onSubmit');
    const signUpCoach = jest.fn();
    const wrapper = shallow(<SignUp
      signUpCoach={signUpCoach}
    />);

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
