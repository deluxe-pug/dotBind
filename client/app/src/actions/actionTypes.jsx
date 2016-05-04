// action creater - function that returns an object
// object is automatically sent to all reducers
// reducers will choose to return a different piece of state, depending on action
// newly returned state piped into application state

import axios from 'axios';

let nextCardId = 0;

export const addCardAction = (url) => {
  return {
    type: 'ADD_CARD',
    id: nextCardId++,
    link: url
  };
};

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
  const request = axios.get(url); // axios returns promise
  // axios.get(url)
  //   .then(function(response) {
  //     console.log('axios in action: ', response.data.data);
  //     return {
  //       type: 'FECTH_CARDS',
  //       allCards: response.data.data // an array of card-objects
  //     };
  //   });
  return {
    type: 'FETCH_CARDS',
    allCards: request
  };
};


