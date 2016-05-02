import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';

// mapping to application state
// each key has each reducer, each piece of state
const appReducer = combineReducers({
  cards: cardsReducer
});

export default appReducer;