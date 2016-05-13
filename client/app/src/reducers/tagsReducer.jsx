const tagsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_TAG':
      console.log('reducer called!')
      return [...state, {
        id: action.payload.data.data[0].id,
        name: action.payload.data.data[0].name,
      }];

    case 'FETCH_TAGS':
      return [...action.payload.data.data, ...state];

    default:
      return state;
  };
};

export default tagsReducer;
