import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {NavigationType} from '../../Types';
import {SCREEN_WIDTH, vh, vw} from '../../constants/dimensions';
import {colors, fonts, images, size, strings} from '../../constants';
import {supabase} from '../../lib/supabase';
import Toast from 'react-native-toast-message';
import {saveAvatarUrl} from '../../features/Auth/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';

interface Props {
  navigation: NavigationType;
}

const IMAGES = [images.crop, images.crop_1, images.crop_2, images.crop_3];

const HomeScreen: FC<Props> = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.Auth);

  useEffect(() => {
    getProfileDetials();
  }, []);

  const getProfileDetials = async () => {
    setLoading(true);
    try {
      const {error, data} = await supabase
        .from('profiles')
        .select(`avatar_url`)
        .eq('id', user?.id)
        .single();
      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoading(false);
      } else {
        dispatch(saveAvatarUrl(data.avatar_url));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

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
