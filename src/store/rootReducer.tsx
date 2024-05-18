import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';

export const reducers = combineReducers({
  Auth: authReducer,
});
