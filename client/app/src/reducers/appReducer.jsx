import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';

const appReducer = combineReducers({
  cardsReducer
});

export default appReducer;