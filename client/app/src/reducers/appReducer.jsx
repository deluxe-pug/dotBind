import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import cardsStateReducer from './cardsStateReducer';
import tagsReducer from './tagsReducer';
import userReducer from './userReducer';
import searchReducer from './searchReducer';

// mapping to application state
// each key has each reducer, each piece of state
const appReducer = combineReducers({
  cards: cardsReducer,
  cardsState: cardsStateReducer,
  tags: tagsReducer,
  user: userReducer,
  search: searchReducer,
});

export default appReducer;
