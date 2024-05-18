import React, {useEffect, useState} from 'react';
import {
  AppState,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import RootNavigator from './src/navigator/RootNavigator';
import {colors} from './src/constants';
import {STREAM_API_KEY, TOKEN} from './src/config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import CustomToast from './src/components/CustomToast';
import {supabase} from './src/lib/supabase';

const userId = 'Callista_Ming';
const user = {
  id: userId,
  name: 'John Malkovich',
  image: `https://getstream.io/random_png/?id=${userId}&name=John+Malkovich`,
};

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
    console.log('startAutoRefresh');
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

function App(): React.JSX.Element {
  const client = new StreamVideoClient({
    apiKey: STREAM_API_KEY,
    user,
    token: TOKEN,
  });

  useEffect(() => {
    notificationPermission();
  }, []);

  const notificationPermission = async () => {
    const status = await PermissionsAndroid.request(
      'android.permission.POST_NOTIFICATIONS',
    );
  };

  return (
    <StreamVideo client={client}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
        <CustomToast />
      </SafeAreaProvider>
    </StreamVideo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
