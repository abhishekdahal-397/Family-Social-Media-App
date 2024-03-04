// src/reduxToolkit/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // add middleware and enhancers if needed
});

export default store;
