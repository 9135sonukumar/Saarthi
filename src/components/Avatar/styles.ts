import {StyleSheet} from 'react-native';
import {colors, fonts, size} from '../../constants';

export const styles = StyleSheet.create({
  AvatarBox: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    resizeMode: 'cover',
  },
  userName: {
    color: colors.primary,
    fontSize: size.S_14,
    fontFamily: fonts.openSansBold,
  },
});
