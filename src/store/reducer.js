import { combineReducers } from 'redux';
import fileHistoryReducer from './fileHistory';

export default combineReducers({
  fileHistory: fileHistoryReducer,
});
