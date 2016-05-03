

const tagsReducer = (state = [], action) => {
  switch(action.type) {
    
    case 'ADD_TAG':
      return [...state, {
        id: action.id,
        name: action.name
      }];

    default:
      return state;
  };
};

export default tagsReducer;