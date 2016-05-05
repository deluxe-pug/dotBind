import { expect } from 'chai';
import * as actions from '../src/actions/actionTypes';
import cardsReducer from '../src/reducers/cardsReducer';
import nock from 'nock';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AllCardsContainer from '../src/containers/AllCardsContainer';
import AddCardContainer from '../src/containers/AddCardContainer';
import Card from '../src/components/Card';
import SearchContainer from '../src/containers/SearchContainer';
import NavBar from '../src/components/NavBar';
import Tag from '../src/components/Tag';

// TEST COMPONENTS
describe('<NavBar />', () => {
  it('renders the a <SearchContainer /> element', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(SearchContainer)).to.have.length(1);
  });
});


// describe('<MyComponent />', () => {

//   it('renders three <Foo /> components', () => {
//     const wrapper = shallow(<MyComponent />);
//     expect(wrapper.find(Foo)).to.have.length(3);
//   });

//   it('renders an `.icon-star`', () => {
//     const wrapper = shallow(<MyComponent />);
//     expect(wrapper.find('.icon-star')).to.have.length(1);
//   });

//   it('renders children when passed in', () => {
//     const wrapper = shallow(
//       <MyComponent>
//         <div className="unique" />
//       </MyComponent>
//     );
//     expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//   });

//   it('simulates click events', () => {
//     const onButtonClick = sinon.spy();
//     const wrapper = shallow(
//       <Foo onButtonClick={onButtonClick} />
//     );
//     wrapper.find('button').simulate('click');
//     expect(onButtonClick.calledOnce).to.equal(true);
//   });

// });


// TESTING MIDDLEWARE
describe('middlewares', () => {
  const testResponse = {
    id: 1,
    highlight: 'hello'
  };

  it('should return a promise', () => {
    const url = 'http://localhost:3000';
    const endpoint = '/v1/cards';

    nock(url)
      .get(endpoint)
      .reply(testResponse);

    actions.fetchCardsAction((response) => {
      expect(response).to.equal(testResponse);
      done();     
    });
  }); 

  it('should handle FETCH_CARDS action', () => {
    // console.log('expect: ', cardsReducer(undefined, {
    //   type: actionTypes.FETCH_CARDS,
    //   payload: {data: {data: testResponse}}
    // }));
    // console.log('to equal: ', [testResponse]);

    expect(cardsReducer(undefined, {
      type: actionTypes.FETCH_CARDS,
      payload: {data: {data: testResponse}}
    })).to.equal([testResponse]);
  });
});

// TESTING ACTIONS
const actionTypes = {
  ADD_CARD: 'ADD_CARD',
  FETCH_CARDS: 'FETCH_CARDS'
};

describe('actions', () => {
  it('should create an action to add a card', () => {
    const url = 'http://www.google.com';
    const expectedAction = {
      type: actionTypes.ADD_CARD,
      id: 2,
      url
    };
    // console.log('addCardAction: ', actions.addCardAction(url));
    expect(actions.addCardAction(url)).to.equal(expectedAction);
  });
});


// TESTING REDUCERS
const initialState = [{
  id: 1,
  url: 'http://www.airbnb.com'
}]

describe('cardsReducer', () => {
  it('should return empty state', () => {
    expect(
      cardsReducer(undefined, {})
    ).to.equal([])
  });

  it('should return the initial state', () => {
    expect(
      cardsReducer(initialState, {})
    ).to.equal(initialState)
  });

  it('should handle ADD_CARD action', () => {
    console.log('cardsReducer: ', cardsReducer(initialState, {
        type: actionTypes.ADD_CARD,
        url: 'http://www.facebook.com'
      }));
    console.log('expected: ', [
        {
          id: 1,
          url: 'http://www.airbnb.com'
        },
        {
          id: undefined,
          url: 'http://www.facebook.com'
        }
      ]);
    expect(
      cardsReducer(initialState, {
        type: actionTypes.ADD_CARD,
        url: 'http://www.facebook.com'
      })).to.equal([
        {
          id: 1,
          url: 'http://www.airbnb.com'
        },
        {
          id: undefined,
          url: 'http://www.facebook.com'
        }
      ]);
  });
});
