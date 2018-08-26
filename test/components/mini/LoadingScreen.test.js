import React from 'react';
import { shallow } from 'enzyme';
import LoadingScreen from '../../../src/components/mini/LoadingScreen';

describe('<LoadingScreen /> component', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<LoadingScreen />);
    expect(wrapper.find('.loading-screen').length).toBe(1);
    expect(wrapper.find('.loading-dots').length).toBe(1);
    expect(wrapper.find('.dot').length).toBe(3);
  });
});
