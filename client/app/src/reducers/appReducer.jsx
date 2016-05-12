import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import tagsReducer from './tagsReducer';
import userReducer from './userReducer';

// mapping to application state
// each key has each reducer, each piece of state
const appReducer = combineReducers({
  cards: cardsReducer,
  tags: tagsReducer,
  user: userReducer,
});

export default appReducer;
