
let tagId = 0;
export const addTag = (tag) => {
  return {
    type: 'ADD_TAG',
    id: tagId++,
    name: tag
  };
};