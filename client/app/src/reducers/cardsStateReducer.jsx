const cardsStateReducer = (state = 'myCards', action) => {
  switch(action.type) {

    case 'TO_INBOX':
      return 'inbox';

    case 'TO_MYCARDS':
      return 'myCards';

    case 'TO_FILTER':
      return 'filter';

    default:
      return state;
  };
};

export default cardsStateReducer;