const cardsStateReducer = (state = 'myCards', action) => {
  switch(action.type) {

    case 'TO_INBOX':
      return 'inbox';

    case 'TO_MYCARDS':
      return 'myCards';

    default:
      return state;
  };
};

export default cardsStateReducer;