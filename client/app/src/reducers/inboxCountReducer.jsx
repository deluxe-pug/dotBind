const inboxCountReducer = (state = 0, action) => {
  switch( action.type ) {

    case 'FETCH_COUNT':
      console.log('FETCH_COUNT reducer called:', action.payload.data.data[0].message_count);
      return action.payload.data.data[0].message_count;

    default:
      return state;

  }
};

export default inboxCountReducer;
