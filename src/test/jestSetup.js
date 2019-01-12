import Enzyme, { shallow, render, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

console.log('setupEnzyme');

configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 16);
};
