import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {NavigationType} from '../../../../../Types';
import {colors, fonts, images, size, strings} from '../../../../../constants';
import {vh, vw} from '../../../../../constants/dimensions';

interface Props {
  route: any;
  navigation: NavigationType;
}
const RecordedClassDetail: FC<Props> = props => {
  const {navigation} = props;
  const classTitle = props.route.params.classTitle;
  const index = props.route.params.index;
  const renderRecordedClass = () => {
    return (
      <View style={styles.recordedClassContainer}>
        <Image source={images.aquaponics} style={styles.videoThumbnailImg} />
        <View style={{marginLeft: vw(8)}}>
          <Text numberOfLines={2} style={styles.classNameText}>
            {`${strings.class} ${index} : ${classTitle}`}
          </Text>
          <View style={styles.bttnContainer}>
            <Pressable style={styles.watchBttn}>
              <Text style={styles.watchText}>{strings.watch}</Text>
            </Pressable>
            <Pressable style={styles.viewPdfBttn}>
              <Text style={styles.watchText}>{strings.view_pdf}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderRecordedClass()}
    </SafeAreaView>
  );
};

export default RecordedClassDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  recordedClassContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: vw(335),
    alignItems: 'center',
    height: 'auto',
  },
  videoThumbnailImg: {
    width: vw(110),
    height: vh(80),
    resizeMode: 'cover',
    borderRadius: vw(10),
  },
  classNameText: {
    fontFamily: fonts.openSansMedium,
    fontSize: size.S_14,
    color: colors.black,
    width: vw(200),
  },
  bttnContainer: {
    flexDirection: 'row',
    width: vw(185),
    justifyContent: 'space-between',
    marginTop: vh(10),
  },
  watchBttn: {
    width: vw(85),
    paddingHorizontal: vw(10),
    paddingVertical: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    borderRadius: vw(8),
  },
  watchText: {
    fontFamily: fonts.openSansRegular,
    fontSize: vw(13),
    color: colors.lightBlack,
  },
  viewPdfBttn: {
    width: vw(85),
    paddingHorizontal: vw(10),
    paddingVertical: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: vw(8),
  },
});
