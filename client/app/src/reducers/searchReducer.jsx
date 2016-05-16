const searchReducer = (state = {
  display: true,
  input: '',
}, action) => {
  switch(action.type) {
    case 'SWITCH_DISPLAY':
      console.log('searchReducer is called: ', action);
      return {
        display: action.display,
        buttons: action.input,
      };
    default:
      console.log('searchReducer is called, default state: ', state);
      return state;
  };
};

export default searchReducer;