const tagsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_TAG':
      return [...state, {
        id: action.payload.data.data[0].id,
        name: action.payload.data.data[0].name,
      }];

    case 'FETCH_TAGS':
      return [...action.payload.data.data, ...state];

    case 'REMOVE_TAG':
      return state;

    default:
      return state;
  };
};

export default tagsReducer;
