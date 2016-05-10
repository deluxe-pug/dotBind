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

export const removeCardAction = (id) => {
  return {
    type: 'REMOVE_CARD',
    id: id
  };
};

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

export const searchCardsAction = (keyword) => {
  // const request = axios.get(endpoints.cards, {
  //   params: {
  //     keyword: keyword
  //   }
  // });
  const request = axios.get(endpoints.cards + '?body=' + keyword);
  return {
    type: 'SEARCH_CARDS',
    payload: request
  }
};
