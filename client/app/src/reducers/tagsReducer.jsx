
const dummyData = ['abc','123','test'];

const tagsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_TAG':
      return [...state, {
        id: action.id,
        name: action.name
      }];

    case 'FETCH_TAGS':
      return [...state, ...action.payload.data.data];

    default:
      return state;
  };
};

export default tagsReducer;
