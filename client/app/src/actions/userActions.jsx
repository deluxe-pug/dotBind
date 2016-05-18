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
    "query": {
      "wildcard": {
        "username": {
          "value": `*${keywords}*`
        }
      }
    }
  };

  const request = axios.post(endpoints.searchUsers, query);
  return {
    type: 'SEARCH_USERS',
    payload: request,
  }

};

export const clearUsersAction = () => {
  return {
    type: 'CLEAR_USERS',
  }
};