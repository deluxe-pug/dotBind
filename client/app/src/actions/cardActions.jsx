// action creater - function that returns an object
// object is automatically sent to all reducers
// reducers will choose to return a different piece of state, depending on action
// newly returned state piped into application state

import axios from 'axios';
import endpoints from './endpoints';

let nextCardId = 1;

export const addCardAction = (url) => {
  const request = axios.post(endpoints.cards, {});
  return {
    type: 'ADD_CARD',
    payload: request,
  };
};

// export const addCardAction = (url) => {
//   return {
//     type: 'ADD_CARD',
//     id: nextCardId++,
//     url: url
//   };
// };

export const removeCardAction = (id) => {
  return {
    type: 'REMOVE_CARD',
    id: id
  };
};

// export const displayCardAction = (card) => {
//   return {
//     type: 'DISPLAY_CARD',
//     payload: card
//   };
// };

export const fetchCardsAction = () => {
  const request = axios.get(endpoints.cards);
  return {
    type: 'FETCH_CARDS',
    payload: request
  };
};

export const filterCardsAction = (tag) => {
  console.log('filterCardsAction is called');
  return {
    type: 'FILTER_CARDS',
    tag: tag
  }
};

export const searchCardAction = (keyword) => {
  const request = axios.get(keyword);
  return {
    type: 'SEARCH_CARDS',
    payload: request
  }
};
