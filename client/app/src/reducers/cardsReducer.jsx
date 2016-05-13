const cardsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_CARD':
      console.log('ADDCARD NEW STATE: ', [...state, action.payload.data.data]);
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
      console.log('filteredCards', filteredCards);
      return [...filteredCards];

    case 'SEARCH_CARDS':
      const returnedIDs = [];
      action.payload.hits.hits.forEach(function(obj) {
        returnedIDs.push(obj._source.id);
      })
      console.log('returnedIDs: ', returnedIDs);
      const searchedCards = state.slice().filter((card) => {
        if (returnedIDs.indexOf(card.id) > -1) { return true; }
      });
      console.log('searchedCards: ', searchedCards);

      // console.log('SEARCH: ', action.payload.hits.hits[0]._source);
      // let searchCardsState = [];
      // action.payload.hits.hits.forEach(function(obj) {
      //   searchCardsState.push(obj._source);
      // })
      // console.log('SEARCH CARDS PAYLOAD: ', searchCardsState);
      return [...searchedCards];

    case 'REMOVE_TAG':
      let removedId = action.payload.data.data[0].id;
      let newState = state.slice(0);
      newState.forEach( (card) => {
        for ( let j = 0; j < card.cardTags.length; j++ ) {
          if ( card.cardTags[j].id === removedId ) {
            card.cardTags.splice(j,1);
          }
        }
      });
      return newState;

    case 'ADD_CARD_TAG':
      let cardId = JSON.parse(action.payload.config.data).card_id;
      let newTagData = action.payload.data.data[0];
      let cardTagId = newTagData.cardTagId;
      let newTag = {
        id: newTagData.id,
        name: newTagData.name,
      };
      let updatedState = [...state];
      updatedState.forEach( (card) => {
        if ( card.id === cardId ) {
          card.cardTags.push({
            id: cardTagId,
            tag: newTag,
          });
        }
      });
      return updatedState;

    default:
      return state;
  };
};

export default cardsReducer;


// case 'REMOVE_CARD':
//   return
//     [...state.slice(0, index),
//      ...state.slice(index+1)];
