// state is not application state,
// only the state that this reducer is responsible for (cards)
const cardsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_CARD':
      return [{
          id: action.id,
          url: action.url
        }, ...state];
    case 'FETCH_CARDS':
      return [...state, ...action.payload.data.data];
    case 'FILTER_CARDS':
      const filteredCards = state.slice().filter((card) => {
        for (var i = 0; i < card.cardTags.length; i++) {
          if (card.cardTags[i].tag.name === action.tag) { return true; }
        };
        return false;
      });
      return [...filteredCards];
    default:
      return state;
  };
};

export default cardsReducer;

// filter((tag) => {
//   // console.log('tagname: ', tag.tag.name === action.tag)
//   tag.tag.name === action.tag
// }

    // case 'REMOVE_CARD':
    //   return
    //     [...state.slice(0, index),
    //      ...state.slice(index+1)];

// redux-promise middleware manipulates data before it hits reducer
// looks at payload property, if it is a promise, stops action until request finishes
// unwraps/resolves promise, send result to reducer
