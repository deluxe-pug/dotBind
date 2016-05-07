import axios from 'axios';
import endpoints from './endpoints';

let tagId = 0;

export const addTag = (tag) => {
  const request = axios.post(endpoints.tags, {name: tag});
  console.log(request);
  return {
    type: 'ADD_TAG',
    payload: request,
  };
};

export const fetchTagsAction = () => {
  const request = axios.get(endpoints.tags);
  return {
    type: 'FETCH_TAGS',
    payload: request,
  };
};
