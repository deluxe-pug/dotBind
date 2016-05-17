export const switchDisplayAction = (bool, input) => {
  console.log('switchDisplayAction is called: ', bool, input);
  return {
    type: 'SWITCH_DISPLAY',
    display: bool,
    input: input,
  };
};

// export const addSearchKeywordAction = (input) => {
//   console.log('addSearchKeywordAction is called!', input);
//   return {
//     type: 'ADD_SEARCH_KEYWORD',
//     input: input,
//   }
// };