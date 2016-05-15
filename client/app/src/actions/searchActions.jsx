export const switchDisplayAction = (bool) => {
  console.log('switchDisplayAction is called: ', bool);
  return {
    type: 'SWITCH_DISPLAY',
    payload: bool,
  }
};