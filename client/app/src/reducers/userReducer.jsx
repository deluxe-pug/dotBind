// state is not application state,
// only the state that this reducer is responsible for (cards)
export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      window.localStorage.setItem('dotBindAccessToken', action.payload.data.access_token);
      window.localStorage.setItem('githubId', action.payload.data.id)
      return action.payload.data;
    default:
      return state;
  }
};
