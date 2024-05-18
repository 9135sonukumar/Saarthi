import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, images} from '../../constants';

const ComingSoon = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.coming_soon} style={styles.icon} />
    </SafeAreaView>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
  },
});
