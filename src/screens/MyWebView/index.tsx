import React, {FC, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import WebView from 'react-native-webview';
import {vh} from '../../constants/dimensions';
import {NavigationType, RouteType} from '../../Types';

interface Props {
  navigation: NavigationType;
  route: RouteType;
}

const MyWebView: FC<Props> = props => {
  const {navigation, route} = props;
  const {title}: any = route?.params;

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <ActivityIndicator
          animating={loading}
          color={colors.primary}
          style={{marginTop: vh(20)}}
        />
      )}
      <WebView
        originWhitelist={['*']}
        onLoadEnd={() => setLoading(false)}
        // startInLoadingState
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        cacheEnabled={false}
        source={{uri: 'https://9135sonukumar.github.io/Privacy-Policy/'}}
      />
    </SafeAreaView>
  );
};

export default MyWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
