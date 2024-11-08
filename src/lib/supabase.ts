import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import {Database} from '../Types/database.types';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
