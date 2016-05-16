const tagsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_TAG':
      console.log('reducer called!')
      return [...state, {
        id: action.payload.data.data[0].id,
        name: action.payload.data.data[0].name,
      }];

    case 'FETCH_TAGS':
      // console.log('tags reducer payload => ', action.payload.data.data);
      // console.log('tags reducer state => ', state);
      // return [...action.payload.data.data, ...state];
      return sortedTags(state, action.payload.data.data, (a, b) => a.card_count < b.card_count);

    default:
      return state;
  };
};

const sortedTags = (state, data, callback) => {
  let newState = [...state, ...data];
  console.log('before sort ===> ', newState);
  newState.sort( (tagA, tagB) => {
    return callback(tagA,tagB);
  });

  console.log('after sort ===> ', newState);
  return newState;
};

export default tagsReducer;
