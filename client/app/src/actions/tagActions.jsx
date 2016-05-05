import axios from 'axios';

let tagId = 0;
export const addTag = (tag) => {
  return {
    type: 'ADD_TAG',
    id: tagId++,
    name: tag
  };
};

export const fetchTagsAction = () => {
  const url = 'http://localhost:3000/v1/tags';
  const request = axios.get(url);
  return {
    type: 'FETCH_TAGS',
    payload: request,
  };
};
