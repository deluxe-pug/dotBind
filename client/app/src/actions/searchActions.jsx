// For typed input
export const switchDisplayAction = (bool, input) => {
  console.log('switchDisplayAction is called')
  return {
    type: 'SWITCH_DISPLAY',
    display: bool,
    input: input,
  };
};

// For clicked tags
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

export const deleteSearchTagAction = (searchTagName) => {
  console.log('deleteSearchTagAction is called', searchTagName);
  return {
    type: 'DELETE_SEARCH_TAG',
    input: searchTagName,
  };
};