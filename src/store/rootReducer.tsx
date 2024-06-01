import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import courseReducer from '../features/Courses/coursesSlice';

export const reducers = combineReducers({
  Auth: authReducer,
  Course: courseReducer,
});
