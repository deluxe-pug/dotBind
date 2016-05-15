const searchReducer = (state = {
  display: true,
}, action) => {
  switch(action.type) {
    case 'SWITCH_DISPLAY': 
      return state.display = action.payload;
    default:
      console.log('search state: ', state);
      return state;
  }
};