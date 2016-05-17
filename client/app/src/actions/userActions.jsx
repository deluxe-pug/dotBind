// action creater - function that returns an object
// object is automatically sent to all reducers
// reducers will choose to return a different piece of state, depending on action
// newly returned state piped into application state

import axios from 'axios';
import endpoints from './endpoints';

export const fetchUserAction = () => {
  const request = axios.get(endpoints.auth);
  return {
    type: 'FETCH_USER',
    payload: request,
  };
};

export const searchUsersAction = (keywords) => {

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
                  "fields": ["username"],
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
  const request = axios.get(endpoints.searchUsers, query);
  return {
    type: 'SEARCH_USERS',
    payload: request,
  }
};
