import axios from 'axios';
import endpoints from './endpoints';

export const addCardAction = (url) => {
  // console.log('addCardAction is triggered');

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
  // console.log('checking middle logs')
  return {
    type: 'ADD_CARD',
    payload: request,
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
    params: {
      "query": {
        index: "library",
        type: "cards",
        body: {
          "query": {
            "bool": {
              "should": [{
                "multi_match": {
                  "query": keywords,
                  "fields": ["title", "url", "code", "text", "note", "cardTags"],
                },
              }],
            },
          },
          "highlight": {
            "fields": {
              "title": {},
              "url": {},
              "code": {},
              "text": {},
              "note": {},
              "domain": {},
              "cardTags": {},
            },
          },
        },
      },
    },
  };
  const request = axios.get(endpoints.search, query);
  return {
    type: 'SEARCH_CARDS',
    payload: request,
  }
};

export const updateCardAction = (reqBody) => {
  const endpoint = `${endpoints.cards}/${reqBody.id}/?access_token=${reqBody.token}`;
  const request = axios.put(endpoint, {
    code: reqBody.code,
    note: reqBody.note,
  });
  return {
    type: 'UPDATE_CARD',
    payload: request,
  };
};

export const deleteCardAction = (cardId) => {
  console.log('action called');
  const endpoint = `${endpoints.cards}/${cardId}/?access_token=${localStorage.getItem('dotBindAccessToken')}`;
  const request = axios.delete(endpoint);
  return {
    type: 'DELETE_CARD',
    payload: request,
  };
};

export const removeTagFromCardAction = (tag) => {
  const request = axios.delete(`${endpoints.card_tags}/${tag.cardTagId}/?access_token=${localStorage.getItem('dotBindAccessToken')}`);
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

// SIMPLE QUERY
// const query = {
//   params: {
//     query: {
//       index: 'library',
//       body: {
//         "query": {
//           "query_string": {
//             "query": keywords
//           }
//         }
//       }
//     }
//   }
// }
