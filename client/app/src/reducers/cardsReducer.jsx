const cardsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_CARD':
      console.log('payload: ', action.payload.data);
      return [...state, action.payload.data.data];

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

    case 'SEARCH_CARDS':
      return [...action.payload.data.data];

    case 'REMOVE_TAG':
      let removedId = action.payload.data.data[0].id;
      let newState = state.slice(0);
      newState.forEach( (card) => {
        for ( let j = 0; j < card.cardTags.length; j++ ) {
          console.log(newState[j].cardTags)
          if ( card.cardTags[j].id === removedId ) {
            card.cardTags.splice(j,1);
          }
        }
      });
      return newState;

    case 'ADD_CARD_TAG':
      console.log('ADD_CARD_TAG reducer');
      console.log(action.payload)
      return state;

    default:
      return state;
  };
};

export default cardsReducer;


// case 'REMOVE_CARD':
//   return
//     [...state.slice(0, index),
//      ...state.slice(index+1)];
