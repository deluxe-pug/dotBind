export const switchSearchBarAction = (searchbarOrButtonView) => {
  console.log('searchbarOrButtonView: ', searchbarOrButtonView);
  return {
    type: 'SWITCH_SEARCH_BAR',
    payload: searchbarOrButtonView
  }
};