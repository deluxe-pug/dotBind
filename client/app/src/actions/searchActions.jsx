export const switchDisplayAction = (bool, input) => {
  return {
    type: 'SWITCH_DISPLAY',
    display: bool,
    input: input,
  };
};

export const addSearchKeywordAction = (bool, input) => {
  return {
    type: 'ADD_SEARCH_KEYWORD',
    display: bool,
    input: input,
  };
};

export const setEmptyInputAction = () => {
  return {
    type: 'SET_EMPTY_INPUT'
  };
};

export const deleteSearchTagAction = (searchTag) => {
  return {
    type: 'DELETE_SEARCH_TAG'
  };
};