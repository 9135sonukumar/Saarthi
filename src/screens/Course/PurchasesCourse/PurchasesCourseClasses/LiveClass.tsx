import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {NavigationType} from '../../../../Types';
import {colors, fonts, screens, size, strings} from '../../../../constants';
import {vh, vw} from '../../../../constants/dimensions';

interface Props {
  navigation: NavigationType;
}
const LiveClass: FC<Props> = props => {
  const {navigation} = props;

  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

export default LiveClass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
