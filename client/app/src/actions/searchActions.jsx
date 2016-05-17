export const switchDisplayAction = (bool, input) => {
  console.log('switchDisplayAction is called: ', bool, input);
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
  }
};