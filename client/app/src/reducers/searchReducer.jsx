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

    case 'ADD_SEARCH_KEYWORD':
      let allInput;
      if (state.input) {
        allInput = state.input.concat(' ', action.input);
        console.log('allInput: ', allInput)
      } else {
        allInput = action.input
      }
      return {
        display: action.display,
        input: allInput
      }


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