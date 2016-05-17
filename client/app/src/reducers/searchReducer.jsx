const searchReducer = (state = {
  display: true,
  input: '',
}, action) => {

  switch(action.type) {
    case 'SWITCH_DISPLAY':
      return {
        display: action.display,
        input: action.input,
      };

    case 'ADD_SEARCH_KEYWORD':
      let allInput = '';
      if (state.input) {
        allInput = state.input.concat(' ', action.input);
      } else {
        allInput = action.input
      }
      return {
        display: action.display,
        input: allInput
      }

    case 'SET_EMPTY_INPUT':
      return {
        display: state.display,
        input: ''
      };

    case 'DELETE_SEARCH_TAG':
      // change search input
      // if (state.input) {
      const newInput = state.input.split(' ').filter(searchTag => searchTag !== action.input).join(' ');
      // }
      console.log('DELETE_SEARCH_TAG', newInput);
      return {
        display: state.display,
        input: newInput
      }

    default:
      return state;
  };
};

export default searchReducer;