// IMPORT????

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
    case 'FETCH_CARDS':
      console.log('inside FETCH_CARDS reducer');
      console.log('action HERE: ', action);
      return;
      // return [...state, ...action.allCards]; 
    default:
      return state;
  };
};

export default cardsReducer;

    // case 'REMOVE_CARD':
    //   return 
    //     [...state.slice(0, index),
    //      ...state.slice(index+1)];

    // redux-promise middleware manipulates data before it hits reducer
    // looks at payload property, if it is a promise, stops action until request finishes
    // unwraps/resolves promise, send result to reducer