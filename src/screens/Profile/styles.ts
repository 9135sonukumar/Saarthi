import {StyleSheet} from 'react-native';
import {colors, fonts, size} from '../../constants';
import {vh, vw} from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: vh(30),
  },
  profileBox: {
    width: vw(100),
    height: vw(100),
    borderRadius: vw(50),
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: vh(40),
    overflow: 'hidden',
  },
  profilePic: {
    width: vw(100),
    height: vw(100),
    resizeMode: 'cover',
  },
  buttonStyle: {
    width: vw(330),
    height: vh(44),
    borderRadius: vw(20),
    marginVertical: vh(20),
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  titleStyle: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
  },
  name: {
    fontSize: size.S_16,
    color: colors.primary,
    fontFamily: fonts.openSansSemiBold,
    marginTop: vh(10),
  },
  email: {
    fontSize: size.S_12,
    color: colors.primary,
    fontFamily: fonts.openSansRegular,
  },
  iconView: {
    width: vw(20),
    height: vw(20),
  },
  imageView1: {
    width: vw(25),
    height: vw(25),
    tintColor: colors.primary,
  },
  textView: {
    fontFamily: fonts.openSansSemiBold,
    fontSize: vw(14),
    color: colors.black,
  },
  textView1: {
    fontFamily: fonts.openSansLight,
    fontSize: vw(12),
  },
  separatorView: {
    backgroundColor: colors.border2,
    width: '100%',
    height: vh(8),
    marginTop: vh(20),
    marginBottom: vh(10),
  },
  rowView1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vh(71),
    borderBottomWidth: 2,
    borderBottomColor: colors.border2,
    marginHorizontal: vw(16),
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  imageView: {flexDirection: 'row', alignItems: 'center'},
  titleView: {marginLeft: vw(18)},
});
