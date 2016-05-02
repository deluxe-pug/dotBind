let nextCardId = 0;

export const addCardAction = (url) => {
  return {
    type: 'ADD_CARD',
    id: nextCardId++,
    link: url
  };
};

export const removeCardAction = (id) => {
  return {
    type: 'REMOVE_CARD',
    id: id
  };
};