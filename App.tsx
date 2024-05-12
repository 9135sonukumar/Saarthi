import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import RootNavigator from './src/navigator/RootNavigator';
import {colors} from './src/constants';
import {API_KEY, TOKEN} from './src/config';

// const callId = 'P73DzcdOvT8A';

const userId = 'Satele_Shan';
const user = {
  id: userId,
  name: 'John Malkovich',
  image: `https://getstream.io/random_png/?id=${userId}&name=John+Malkovich`,
};

function App(): React.JSX.Element {
  const client = new StreamVideoClient({apiKey: API_KEY, user, token: TOKEN});

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
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />
        <RootNavigator />
      </SafeAreaView>
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
