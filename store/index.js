import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import generalDataReducer from './generalData';

export const store = configureStore({
  reducer: {
    user: userReducer,
    generalData: generalDataReducer,
  },
});
