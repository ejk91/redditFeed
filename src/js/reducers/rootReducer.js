import { combineReducers } from 'redux';

import subredditReducer from './subredditReducer.js';
import postReducer from './postReducer.js';

export default combineReducers({
  subredditReducer,
  postReducer 
})
