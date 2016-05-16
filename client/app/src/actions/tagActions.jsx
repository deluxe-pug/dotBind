import axios from 'axios';
import endpoints from './endpoints';

let tagId = 0;

export const addTag = (tag) => {
  console.log('action called!')
  const request = axios.post(endpoints.tags, {name: tag});
  console.log(request);
  return {
    type: 'ADD_TAG',
    payload: request,
  };
};

export const fetchTagsAction = () => {
  const access_token = localStorage.getItem('dotBindAccessToken')
  const request = axios.get(`${endpoints.user_tags}?access_token=${access_token}`);
  // const request = axios.get(endpoints.tags);
  return {
    type: 'FETCH_TAGS',
    payload: request,
  };
};
