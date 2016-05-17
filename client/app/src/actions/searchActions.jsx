export const switchDisplayAction = (bool, input) => {
  // console.log('switchDisplayAction is called: ', bool, input);
  return {
    type: 'SWITCH_DISPLAY',
    display: bool,
    input: input,
  };
};

export const addKeyword = (input) => {
  return {
    type: 'ADD_KEYWORD',
    input: input,
  }
};