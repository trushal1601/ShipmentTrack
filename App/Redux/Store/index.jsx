import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../RootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
