import axios from 'axios';
import endpoints from './endpoints';

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

export const addCardAction = (url) => {
  const accessToken = localStorage.getItem('dotBindAccessToken');
  const username = localStorage.getItem('githubUsername')
  const request = axios.get(`${endpoints.fetchsite}?url=${url}&username=${username}&accessToken=${accessToken}`);
  console.log('username: ', username)
  console.log('accessToken: ', accessToken)
  // const request = axios.post(endpoints.cards, {
  //   "card": {
  //     "url": url,
  //     "title": "title",
  //     "code": "var hello = function() {};",
  //     "text": "This is my text",
  //     "note": "This is a note about my content",
  //     "domain": "american.com"
  //   },
  //   "username": "public",
  //    "tags": [
  //     "React",
  //     "Backbone"
  //    ]
  // });

  return {
    type: 'ADD_CARD',
    payload: request,
  };
};

export const saveMessageAction = (cardObj, username, tagArray) => {
  const endpoint = `${endpoints.cards}?access_token=${localStorage.getItem('dotBindAccessToken')}`;
  const request = axios.post(endpoint, {
    card: cardObj,
    username: username,
    tags: tagArray,
  });
  return {
    type: 'SAVE_NEW_CARD',
    payload: request,
  }
};

export const fetchCardsAction = () => {
  const accesstoken = localStorage.getItem('dotBindAccessToken');
  const request = axios.get(`${endpoints.cards}?access_token=${accesstoken}`).catch((err) => console.error('Error fetching cards: ', err));
  return {
    type: 'FETCH_CARDS',
    payload: request,
  };
};

export const setToCardsAction = () => {
  return {
    type: 'TO_MYCARDS'
  }
};

export const setToFilterAction = () => {
  return {
    type: 'TO_FILTER'
  }
};

export const fetchInboxAction = () => {
  const accesstoken = localStorage.getItem('dotBindAccessToken');
  const request = axios.get(`${endpoints.inbox}?access_token=${accesstoken}`).catch((err) => console.error('Error fetching cards: ', err));
  return {
    type: 'FETCH_INBOX',
    payload: request,
  };
};

export const setToInboxAction = () => {
  return {
    type: 'TO_INBOX'
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
                  "type": "most_fields",
                  "fields": ["title", "url", "code", "text", "note", "domain", "cardTags.tag.name"],
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
              "cardTags.tag.name": {},
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
    language: reqBody.language
  });
  return {
    type: 'UPDATE_CARD',
    payload: request,
  };
};

export const deleteCardAction = (cardId) => {
  const endpoint = `${endpoints.cards}/${cardId}/?access_token=${localStorage.getItem('dotBindAccessToken')}`;
  const request = axios.delete(endpoint);
  return {
    type: 'DELETE_CARD',
    payload: request,
  };
};

export const deleteMessageAction = (cardId) => {
  const endpoint = `${endpoints.inbox}/${cardId}/?access_token=${localStorage.getItem('dotBindAccessToken')}`;
  const request = axios.delete(endpoint);
  return {
    type: 'DELETE_MESSAGE',
    payload: request,
  };
};

export const shareCardAction = (username, id) => {
  const endpoint = `${endpoints.inbox}/?access_token=${localStorage.getItem('dotBindAccessToken')}`;
  const request = axios.post(endpoint, {
    from: localStorage.getItem('githubUsername'),
    to: username,
    card_id: id,
  });
  return {
    type: 'SHARE_CARD',
  };
}

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

export const removeCardFilterAction = (keywords) => {
  // first search
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
                  "type": "most_fields",
                  "fields": ["title", "url", "code", "text", "note", "domain", "cardTags.tag.name"],
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
              "cardTags.tag.name": {},
            },
          },
        },
      },
    },
  };
  const request = axios.get(endpoints.search, query);
  return {
    type: 'REMOVE_CARD_FILTER',
    payload: request,
  }
};
