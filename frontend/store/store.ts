import { configureStore } from '@reduxjs/toolkit';
import carbonReducer from './carbonSlice';

export const store = configureStore({
  reducer: {
    carbon: carbonReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;