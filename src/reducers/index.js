import { combineReducers } from 'redux';
import { professorsReducer } from './professors';
import { schoolsReducer } from './schools';

export default combineReducers({
  professors: professorsReducer,
  schools: schoolsReducer,
});
