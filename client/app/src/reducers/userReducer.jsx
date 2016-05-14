// state is not application state,
// only the state that this reducer is responsible for (cards)
export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      // Refactor, no side effects should be present in reducer
      window.localStorage.setItem('dotBindAccessToken', action.payload.data.access_token);
      window.localStorage.setItem('githubId', action.payload.data.id) // TODO: clean up, may not need any more
      window.localStorage.setItem('githubUsername', action.payload.data.username);
      return action.payload.data;
    default:
      return state;
  }
};
