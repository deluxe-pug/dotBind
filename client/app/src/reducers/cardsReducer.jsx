// state is not application state,
// only the state that this reducer is responsible for (cards)
const cardsReducer = (state = [], action) => {
  console.log('reducer triggered, initial state: ', state);
  switch(action.type) {
    case 'ADD_CARD':
      console.log('inside ADD_CARD type in cardsReducer');
      console.log([...state, {
          id: action.id,
          link: action.link
        }]);
      return [...state, {
          id: action.id,
          link: action.link
        }];
    // case 'REMOVE_CARD':
    //   return 
    //     [...state.slice(0, index),
    //      ...state.slice(index+1)];
    default:
      return state;
  };
};

export default cardsReducer;