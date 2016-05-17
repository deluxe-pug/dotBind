const searchReducer = (state = {
  display: true,
  input: '',
}, action) => {

  switch(action.type) {
    case 'SWITCH_DISPLAY':
      // console.log('searchReducer is called: ', action);
      return {
        display: action.display,
        input: action.input,
      };

    // case 'ADD_SEARCH_KEYWORD':
    //   console.log('ADD_SEARCH_KEYWORD reducer is called', {
    //     display: state.display,
    //     input: action.input
    //   });
    //   return {
    //     display: state.display,
    //     input: action.input
    //   };

    default:
      return state;
  };
};

export default searchReducer;