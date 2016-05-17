const tagsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_TAG':
      console.log('reducer called!')
      return [...state, {
        id: action.payload.data.data[0].id,
        name: action.payload.data.data[0].name,
      }];

    case 'FETCH_TAGS':
      const newTags = action.payload.data.data;
      return newTags.sort((tagA, tagB) => tagA.card_count < tagB.card_count);
      // return sortedTags(state, newTags, (a, b) => a.card_count > b.card_count);


    default:
      return state;
  };
};

const sortedTags = (state, data, callback) => {
  let newState = [...state, ...data];
  newState.sort( (tagA, tagB) => callback(tagA,tagB) );
  return newState.reverse();
};

export default tagsReducer;
