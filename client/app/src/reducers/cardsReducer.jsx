// state is not application state,
// only the state that this reducer is responsible for (cards)
const cardsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_CARD':
      console.log('----------=> ', action.payload);
      return [{
          id: action.id,
          url: action.url
        }, ...state];

    case 'FETCH_CARDS':
      console.log('-=--=--==> ',action.payload);
      return [...state, ...action.payload.data.data];

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
