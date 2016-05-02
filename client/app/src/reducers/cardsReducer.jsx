// import dummyData from '../index';
// console.log('dummyData: ', dummyData);

const dummyData = {
  user: 'connie',
  cards:
    [
      {
        id: 0,
        link: 'www.google.com'
      },
      {
        id: 1,
        link: 'www.facebook.com'
      }
    ]
}

const cardsReducer = (state = dummyData, action) => {
  switch(action.type) {
    case 'ADD_CARD':
      return {
        user: state.user,
        cards: [...state.cards,
          {
            id: 'nextid',
            link: 'whatever they typed'
          }
        ]
      }
    case 'REMOVE_CARD':
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