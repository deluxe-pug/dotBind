// action creater - function that returns an object
// object is automatically sent to all reducers
// reducers will choose to return a different piece of state, depending on action
// newly returned state piped into application state

import axios from 'axios';

let nextCardId = 1;

export const addCardAction = (url) => {
  const endPoint = 'http://localhost:3000/v1/cards';
  const request = axios.post(endPoint, {});
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
  const url = 'http://localhost:3000/v1/cards';
  const request = axios.get(url);
  return {
    type: 'FETCH_CARDS',
    payload: request
  };
};
