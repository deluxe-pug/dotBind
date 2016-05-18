const searchUsersReducer = (state = [], action) => {
  switch(action.type) {
    case 'SEARCH_USERS':
      console.log('new state: ', action.payload.data);
      return action.payload.data.data;
    default:
      return state;
  };
};

export default searchUsersReducer;