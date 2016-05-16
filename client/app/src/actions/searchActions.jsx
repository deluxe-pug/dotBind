export const switchDisplayAction = (bool, buttons) => {
  console.log('switchDisplayAction is called: ', bool, buttons);
  return {
    type: 'SWITCH_DISPLAY',
    display: bool,
    buttons: buttons
  };
};