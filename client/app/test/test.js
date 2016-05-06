import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import NavBar from '../src/components/NavBar';
import App from '../src/components/App';

describe('<App />', () => {
  it('should render a <AddCardContainer /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(header)).to.have.length(1);
  });
});

describe('<NavBar />', () => {
  it('should render a <Navbar /> component', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find('.nav-bar-fixed')).to.have.length(1);
  });
});
