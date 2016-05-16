const searchReducer = (state = {
  display: true,
  buttons: [],
}, action) => {
  switch(action.type) {
    case 'SWITCH_DISPLAY':
      console.log('searchReducer is called: ', action.display);
      return {
        display: action.display,
        buttons: action.buttons
      };
    default:
      console.log('searchReducer is called, default state: ', state);
      return state;
  };
};

export default searchReducer;