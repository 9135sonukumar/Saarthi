import {createSlice} from '@reduxjs/toolkit';
import {Session, User, UserMetadata} from '@supabase/supabase-js';

type AuthState = {
  token: string | null;
  user: User | null;
  userData: UserMetadata | null;
  avatar_url: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  userData: null,
  avatar_url: null,
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
    saveAvatarUrl: (state, {payload}) => {
      state.avatar_url = payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {saveAuth, reset, saveAvatarUrl} = authSlice.actions;

export default authSlice.reducer;
