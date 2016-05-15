export const switchDisplayAction = (bool) => {
  console.log('searchbarOrButtonView: ', bool);
  return {
    type: 'SWITCH_DISPLAY',
    payload: bool
  }
};