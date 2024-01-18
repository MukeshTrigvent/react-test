import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import addressReducer from './addressSlice';
import recordReducer from './recordSlice'

const rootReducer = {
  form: formReducer,
  address: addressReducer,
  record: recordReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;