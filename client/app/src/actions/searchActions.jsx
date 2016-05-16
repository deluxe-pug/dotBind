export const switchDisplayAction = (bool, input) => {
  console.log('switchDisplayAction is called: ', bool, input);
  return {
    type: 'SWITCH_DISPLAY',
    display: bool,
    input: input,
  };
};