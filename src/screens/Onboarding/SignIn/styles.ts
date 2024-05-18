import {StyleSheet} from 'react-native';
import {colors, fonts, size} from '../../../constants';
import {vh, vw} from '../../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  logo_sqr: {
    width: vw(200),
    height: vh(100),
    resizeMode: 'cover',
    marginTop: vh(20),
  },
  inputStyle: {
    width: vw(330),
    alignSelf: 'center',
  },
  buttonStyle: {
    width: vw(330),
    height: vh(44),
    borderRadius: vw(20),
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  titleStyle: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
  },
  dontHave: {
    fontSize: size.S_14,
    color: colors.primary,
    fontFamily: fonts.openSansMedium,
  },
  forgot: {
    fontSize: size.S_14,
    color: colors.primary,
    fontFamily: fonts.openSansSemiBold,
  },
  forgotBttn: {
    alignSelf: 'flex-end',
    marginBottom: vh(30),
  },
});
