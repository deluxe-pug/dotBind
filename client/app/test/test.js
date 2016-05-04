import expect from 'expect';
import * as actions from '../src/actions/actionTypes';
import cardsReducer from '../src/reducers/cardsReducer';


// TESTING ACTIONS
const types = {
  ADD_CARD: 'ADD_CARD'
};

describe('actions', () => {
  it('should create an action to add a card', () => {
    const url = 'http://www.google.com';
    const expectedAction = {
      type: types.ADD_CARD,
      id: 1,
      url
    };
    expect(actions.addCardAction(url)).toEqual(expectedAction);
  });
});


// TESTING REDUCERS
const initialState = {
  id: 1,
  url: 'http://www.airbnb.com'
}

describe('cardsReducer', () => {
  it('should return the initial state', () => {
    expect(
      cardsReducer(undefined, {})
    ).toEqual([])
  });

  it('should handle ADD_CARD', () => {
    expect(
      cardsReducer(initialState, {
        type: types.ADD_CARD,
        url: 'http://www.facebook.com'
      })).toEqual([
        {
          id: 1,
          url: 'http://www.airbnb.com'
        },
        {
          id: 2,
          url: 'http://www.facebook.com'
        }
      ]);
  });
});
