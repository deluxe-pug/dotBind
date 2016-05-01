let nextCardId = 0;

export const addCardAction = (url) => {
  return {
    type: 'ADD_CARD',
    id: nextCardId++,
    link: url
  }
};