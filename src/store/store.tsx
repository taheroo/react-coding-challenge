import { configureStore } from '@reduxjs/toolkit';
import reducer from './fileHistory';

export default configureStore({
  reducer,
});
