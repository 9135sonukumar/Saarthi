import React, {FC} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {NavigationType} from '../../Types';
import {SCREEN_WIDTH, vh, vw} from '../../constants/dimensions';
import {colors, fonts, images, screens, size, strings} from '../../constants';

interface Props {
  navigation: NavigationType;
}

const IMAGES = [images.crop, images.crop_1, images.crop_2, images.crop_3];

const HomeScreen: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 220}}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          {IMAGES.map((image, i) => (
            <Image key={i.toString()} source={image} style={styles.image} />
          ))}
        </ScrollView>
      </View>
      <Image source={images.logo_sqr} style={styles.logo_sqr} />
      <Text style={styles.textSaarthi}>{strings.welcome_to_saarthi}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: vh(200),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  logo_sqr: {width: SCREEN_WIDTH, height: vh(150), resizeMode: 'cover'},
  textSaarthi: {
    fontSize: size.S_12,
    color: colors.primary,
    fontFamily: fonts.openSansMedium,
    marginTop: vw(20),
  },
});
