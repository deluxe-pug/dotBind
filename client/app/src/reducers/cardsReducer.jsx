const cardsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_CARD':
      return [...state, ...action.payload.data.data];

    case 'FETCH_CARDS':
      return [...action.payload.data.data];

    case 'FETCH_INBOX':
      return [...action.payload.data.data];

    case 'SAVE_NEW_CARD':
      return state;

    case 'SEARCH_CARDS':
      const returnedIDs = [];
      action.payload.data.data.forEach(function(obj) {
        returnedIDs.push(obj._source.id);
      })
      const searchedCards = state.slice().filter((card) => {
        if (returnedIDs.indexOf(card.id) > -1) { return true; }
      });
      return searchedCards;

    case 'SHARE_CARD':
      return state;

    case 'REMOVE_CARD_FILTER':
      const removedCards = [];
      action.payload.data.data.forEach(function(obj) {
        removedCards.push(obj._source);
      })
      return [...removedCards];

    case 'UPDATE_CARD':
      var data = action.payload.data.data[0];
      return updatedCard(state, data);

    case 'DELETE_CARD':
      return state;

    case 'REMOVE_TAG':
      return removedCardTag(state, action.payload);

    case 'ADD_CARD_TAG':
      return addedCardTag(state, action.payload);

    default:
      return state;
  };
};


///////////////////////// HELPERS ///////////////////////////
const filteredCards = (state, tag) => {
  const results = [...state].filter( card => {
    for (var i = 0; i < card.cardTags.length; i++) {
      if (card.cardTags[i].tag.name === tag) { return true; }
    };
    return false;
  });
  return results;
};

const updatedCard = (state, data) => {
  const newCardId = data.id;
  let newCardState = [...state];
  newCardState.forEach( (card) => {
    if ( card.id === newCardId ) {
      card.code = data.code;
      card.note = data.note;
    }
  });
  return newCardState;
};

const removedCardTag = (state, payload) => {
  const removedId = payload.data.data[0].id;
  let updatedState = [...state];
  updatedState.forEach( (card) => {
    card.cardTags = card.cardTags.filter( (tag) => tag.id !== removedId );
  });
  return updatedState;
};

const addedCardTag = (state, payload) => {
  const cardId = JSON.parse(payload.config.data).card_id;
  const newTagData = payload.data.data[0];
  const cardTagId = newTagData.cardTagId;
  const newTag = {
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
};

export default cardsReducer;
