import expect from 'expect';
import * as actions from '../src/actions/actionTypes';
import cardsReducer from '../src/reducers/cardsReducer';
import nock from 'nock';


// TESTING MIDDLEWARE
describe('middlewares', () => {
  const testResponse = {
    id: 1,
    highlight: 'hello'
  };

  it('should return a promise', () => {
    const url = 'http://localhost:3000';
    const endpoint = '/v1/cards';
    console.log('anything!!!!');

    nock(url)
      .get(endpoint)
      .reply(testResponse);

    actions.fetchCardsAction((response) => {
      expect(response).toEqual(testResponse);
      done();     
    });
  });
  it('should handle FETCH_CARDS action', () => {
    console.log('EVERYTHING!!!');
    expect(
      cardsReducer(undefined, {
        type: actionTypes.FETCH_CARDS,
        payload: {data: {data: 'something here?'}}
      })).toEqual([testResponse]);
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
      id: 1,
      url
    };
    expect(actions.addCardAction(url)).toEqual(expectedAction);
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
    ).toEqual([])
  });

  it('should return the initial state', () => {
    expect(
      cardsReducer(initialState, {})
    ).toEqual(initialState)
  });

  it('should handle ADD_CARD action', () => {
    expect(
      cardsReducer(initialState, {
        type: actionTypes.ADD_CARD,
        url: 'http://www.facebook.com'
      })).toEqual([
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
