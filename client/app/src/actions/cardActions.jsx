import axios from 'axios';
import endpoints from './endpoints';

export const addCardAction = (url) => {
  const request = axios.post(endpoints.cards, {
    "card": {
      "url": url,
      "title": "title",
      "code": "var hello = function() {};",
      "text": "This is my text",
      "note": "This is a note about my content",
      "domain": "american.com"
    },
    "username": "public",
     "tags": [
      "React",
      "Backbone"
     ]
  });
  return {
    type: 'ADD_CARD',
    payload: request,
  };
};

export const removeCardAction = (id) => {
  return {
    type: 'REMOVE_CARD',
    id: id,
  };
};

export const fetchCardsAction = () => {
  const request = axios.get(endpoints.cards);
  return {
    type: 'FETCH_CARDS',
    payload: request,
  };
};

export const filterCardsAction = (tag) => {
  console.log('filterCardsAction is called');
  return {
    type: 'FILTER_CARDS',
    tag: tag,
  }
};

export const searchCardsAction = (keywords) => {
  let query = endpoints.cards + '?title__contains=' + keywords[0];
  if (keywords.length > 1) {
    for (var i = 1; i < keywords.length; i++) {
      query = query.concat(',%20', keywords[i]);
    }
  }
  const request = axios.get(query);
  return {
    type: 'SEARCH_CARDS',
    payload: request,
  }
};
