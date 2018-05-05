import { combineReducers } from 'redux';
import phrasesReducer from './phrasesReducer';

export default combineReducers({
  phrases: phrasesReducer,
});