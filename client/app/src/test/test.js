var React = require('react');
var ReactDom = require('react-dom');
var shallow = require('enzyme').shallow;
var expect = require('../app/node_modules/chai').expect;
var expectJSX = require('expect-jsx');
var TestComponent = require('../app/src/testComponent');

describe('(Container) TestComponent', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<TestComponent />);
    expect(wrapper.type()).to.eql('div');
  });

  it('has style with height 100%', () => {
    const wrapper = shallow(<TestComponent />);
    const expectedStyles = {
      height: '100%',
      background: '#333'
    }
    expect(wrapper.prop('style')).to.eql(expectedStyles);
  });

  it('contains a header explaining the app', () => {
    const wrapper = shallow(<TestComponent />);
    expect(wrapper.find('.welcome-header')).to.have.length(1);
  });
});

// describe('First test', () => {
//
//   it('should at least run test 1: ', () => {
//     expect(1).to.equal(1);
//   });
//
//   it('should at least run test 2: ', () => {
//     expect().to.equal();
//   });
//
//   it('should at least run test 3:', () => {
//     expect('hi').to.equal('hi');
//   });
//
// });
