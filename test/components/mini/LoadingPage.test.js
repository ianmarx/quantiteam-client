import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../../src/components/mini/LoadingPage';

describe('<LoadingPage /> component', () => {
  it('should render expected elements', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper.find('.loading-page').length).toBe(1);
    expect(wrapper.find('.loading-screen').length).toBe(1);
    expect(wrapper.find('.dot').length).toBe(4);
  });
});
