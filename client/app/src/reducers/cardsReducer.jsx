const cardsReducer = (state = {user:'connie', cards:[]}, action) => {
  switch(action.type) {
    case 'ADD_CARD':
      return {
        user: state.user,
        cards: [...state.cards,
          {
            id: 'nextid',
            link: 'whatever they typed',
            tags: 'whatever they selected'
          }
        ]
      }
    case 'DETELE_CARD':
      return {
        user: state.user,
        cards: [...cards.slice(0, index),
                ...cards.slice(index+1)]
      }
    default:
      return state;
  }
}

export default cardsReducer;