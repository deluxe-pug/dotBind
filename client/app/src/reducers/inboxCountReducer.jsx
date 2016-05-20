const inboxCountReducer = (state = 0, action) => {
  switch( action.type ) {

    case 'FETCH_COUNT':
      console.log('FETCH_COUNT reducer called.');
      return state;

    default:
      return state;

  }
};

export default inboxCountReducer;
