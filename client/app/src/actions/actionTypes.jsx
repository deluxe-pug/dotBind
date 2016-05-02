// action creater - function that returns an object
// object is automatically sent to all reducers
// reducers will choose to return a different piece of state, depending on action
// newly returned state piped into application state

let nextCardId = 0;

export const addCardAction = (url) => {
  console.log('addCardAction is dispatched!');
  console.log('new state: id=', nextCardId++, 'link=', url);
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

export const displayCardAction = (card) => {
  return {
    type: 'DISPLAY_CARD',
    payload: card
  };
};