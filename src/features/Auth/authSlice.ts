import {createSlice} from '@reduxjs/toolkit';
import {Session, User, UserMetadata} from '@supabase/supabase-js';

type AuthState = {
  token: string | null;
  user: User | null;
  userData: UserMetadata | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuth: (state, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
      state.userData = payload.user_metadata;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {saveAuth, reset} = authSlice.actions;

export default authSlice.reducer;
