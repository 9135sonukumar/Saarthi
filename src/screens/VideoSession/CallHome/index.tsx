import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {NavigationType} from '../../../Types';
import {colors, fonts, screens, size, strings} from '../../../constants';
import {vh, vw} from '../../../constants/dimensions';

interface Props {
  navigation: NavigationType;
}
const CallHome: FC<Props> = props => {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.navigate(screens.Call)}>
        <Text style={styles.text}>{strings.join_live_session}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CallHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  text: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
  },
  button: {
    width: vw(250),
    height: vh(40),
    borderRadius: vw(8),
    marginTop: vh(40),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
