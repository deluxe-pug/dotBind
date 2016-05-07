import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import tagsReducer from './tagsReducer';

// mapping to application state
// each key has each reducer, each piece of state
const appReducer = combineReducers({
  cards: cardsReducer,
  tags: tagsReducer
});

export default appReducer;