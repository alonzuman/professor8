import { combineReducers } from 'redux';
import { professorsReducer } from './professors';

export default combineReducers({
  professors: professorsReducer
});
