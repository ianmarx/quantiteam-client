import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.dispatch = jest.fn();
global.fetch = require('jest-fetch-mock');

// jsdom no longer has these functions
window.alert = jest.fn();
window.scrollTo = jest.fn();
