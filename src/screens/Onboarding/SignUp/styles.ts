import {StyleSheet} from 'react-native';
import {colors, fonts, size} from '../../../constants';
import {vh, vw} from '../../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputBoxStyle: {width: vw(330), alignSelf: 'center'},
  buttonStyle: {
    width: vw(330),
    height: vh(44),
    borderRadius: vw(20),
    marginBottom: vh(40),
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  titleStyle: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
  },
  inputStyle: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansSemiBold,
  },
});
