// state is not application state,
// only the state that this reducer is responsible for (cards)
const cardsReducer = (state = [], action) => {
  console.log('reducer triggered');
  switch(action.type) {
    case 'ADD_CARD':
      console.log('inside ADD_CARD type in cardsReducer');
      return 
        [...state.cards, {
          id: action.id,
          link: action.link
        }];
    // case 'REMOVE_CARD':
    //   return 
    //     [...cards.slice(0, index),
    //      ...cards.slice(index+1)];
    default:
      return state;
  }
}

export default cardsReducer;