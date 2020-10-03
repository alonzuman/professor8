import { combineReducers } from 'redux';
import { professorsReducer } from './professors';
import { schoolsReducer } from './schools';
import { authReducer } from './auth';
import { tagsReducer } from './tags';
import { adminReducer } from './admin';
import { feedbackReducer } from './feedback';

export default combineReducers({
  professors: professorsReducer,
  schools: schoolsReducer,
  auth: authReducer,
  tags: tagsReducer,
  admin: adminReducer,
  feedback: feedbackReducer,
});
