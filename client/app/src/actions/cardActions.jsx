import axios from 'axios';
import endpoints from './endpoints';

// import elasticsearch from 'elasticsearch';
// const client = new elasticsearch.Client({
//   host: endpoints.elasticsearch,
//   log: 'trace'
// });

export const addCardAction = (url) => {
  console.log('addCardAction is triggered');

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
  console.log('checking middle logs')
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
  const accesstoken = localStorage.getItem('dotBindAccessToken');
  const request = axios.get(`${endpoints.cards}?access_token=${accesstoken}`).catch((err) => console.error('Error fetching cards: ', err));
  return {
    type: 'FETCH_CARDS',
    payload: request,
  };
};

export const filterCardsAction = (tag) => {
  return {
    type: 'FILTER_CARDS',
    tag: tag,
  }
};

export const searchCardsAction = (keywords) => {

  const query = {
    index: 'library',
    body: {
      "query": {
        "query_string": {
          "query": keywords
        }
      }
    }
  };

  // const request = client.search(query);
  const request = axios.get(endpoints.search, query);

  return {
    type: 'SEARCH_CARDS',
    payload: request,
  }

};

export const removeTagFromCardAction = (tag) => {
  const request = axios.delete(endpoints.card_tags + '/' + tag.cardTagId);
  return {
    type: 'REMOVE_TAG',
    payload: request,
  };
};

export const addTagToCardAction = (tagName, userId, cardId) => {
  const request = axios.post(endpoints.tags, {
    user_id: userId,
    card_id: cardId,
    tags: [
      tagName
    ],
  });
  return {
    type: 'ADD_CARD_TAG',
    payload: request,
  };
};

// export const searchCardsAction = (keywords) => {
//   let query = endpoints.cards + '?title__contains=' + keywords[0];
//   if (keywords.length > 1) {
//     for (var i = 1; i < keywords.length; i++) {
//       query = query.concat(',%20', keywords[i]);
//     }
//   }
//   const request = axios.get(query);
//   return {
//     type: 'SEARCH_CARDS',
//     payload: request,
//   }
// };
