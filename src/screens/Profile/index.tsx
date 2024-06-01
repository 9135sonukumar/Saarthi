import React, {FC, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Image,
  Text,
  View,
  ImageProps,
  Platform,
} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import {ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {NavigationType} from '../../Types';
import {supabase} from '../../lib/supabase';
import Router from '../../navigator/routes';
import Toast from 'react-native-toast-message';
import {SCREEN_WIDTH, vh, vw} from '../../constants/dimensions';
import {reset, saveAvatarUrl} from '../../features/Auth/authSlice';
import {colors, images, screens, size, strings} from '../../constants';
import {styles} from './styles';
import {PickImage} from '../../utils/common-methods';
import {decode} from 'base64-arraybuffer';
import Avatar from '../../components/Avatar';
import {Modalize} from 'react-native-modalize';

interface Props {
  navigation: NavigationType;
}

const Profile: FC<Props> = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const dispatch = useAppDispatch();
  const {userData, user, avatar_url} = useAppSelector(state => state.Auth);

  const signOut = async () => {
    setLoadingLogout(true);
    try {
      const {error} = await supabase.auth.signOut();
      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoadingLogout(false);
      } else {
        dispatch(reset());
        Router.resetNew(navigation, 'SignIn');
        setLoadingLogout(false);
      }
    } catch (err) {
      setLoadingLogout(false);
    }
  };

  const uploadPicture = async (path: string, body: any, mimeType: string) => {
    setLoading(true);
    try {
      const {error, data} = await supabase.storage
        .from('avatars')
        .upload(path, body, {contentType: mimeType});
      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoading(false);
      } else {
        updateAvatarUrl(data.path);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const updateAvatarUrl = async (path: string) => {
    setLoading(true);
    try {
      const {
        data: {publicUrl},
      } = supabase.storage.from('avatars').getPublicUrl(path);

      const {error} = await supabase
        .from('profiles')
        .update({avatar_url: publicUrl})
        .eq('id', user?.id);

      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoading(false);
      } else {
        dispatch(saveAvatarUrl(publicUrl));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const renderItem = (item: ProfileOption) => {
    return (
      <Pressable
        key={item.id.toString()}
        onPress={() => {
          navigation.navigate(item.navigationScreen, item.params);
        }}
        style={styles.rowView1}>
        <View style={styles.imageView}>
          <Image
            style={styles.imageView1}
            source={item.image}
            resizeMode={'contain'}
          />
          <View style={styles.contentView}>
            <View style={styles.titleView}>
              <Text numberOfLines={1} style={styles.textView}>
                {item.title}
              </Text>
              {/* <Text numberOfLines={1} style={styles.textView1}>
                {'description'}
              </Text> */}
            </View>
          </View>
          <Image source={images.chevron_left} style={styles.iconView} />
        </View>
      </Pressable>
    );
  };

  const renderModalContent = () => {
    return (
      <>
        <Text style={styles.profilePhoto}>{strings.profile_photo}</Text>
        <View style={styles.optionBox}>
          <Pressable
            style={styles.align}
            onPress={() => {
              PickImage.getCamera(
                true,
                (image: any, mimeType: any, filename: string) => {
                  // console.log('image===========>>>', {mimeType, filename, image});
                  modalizeRef.current?.close();
                  uploadPicture(filename, decode(image), mimeType);
                },
              );
            }}>
            <View style={styles.iconBox}>
              <Image source={images.camera} style={styles.icon} />
            </View>
            <Text style={styles.iconText}>{strings.camera}</Text>
          </Pressable>
          <Pressable
            style={styles.align}
            onPress={() => {
              PickImage.getSinglePic(
                true,
                (image: any, mimeType: any, filename: string) => {
                  // console.log('image===========>>>', {mimeType, filename});
                  modalizeRef.current?.close();
                  uploadPicture(filename, decode(image), mimeType);
                },
              );
            }}>
            <View style={styles.iconBox}>
              <Image source={images.picture} style={styles.icon} />
            </View>
            <Text style={styles.iconText}>{strings.gallery}</Text>
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modalize
        ref={modalizeRef}
        snapPoint={300}
        // onClose={() => {}}
        // onOpen={() => {}}
        avoidKeyboardLikeIOS={true}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? undefined : 'height'}
        handleStyle={{backgroundColor: colors.border1, marginTop: vh(15)}}
        modalHeight={180}>
        <View style={{width: SCREEN_WIDTH, marginTop: vh(30)}}>
          {renderModalContent()}
        </View>
      </Modalize>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Avatar
          userName={userData?.full_name}
          url={avatar_url}
          style={{marginTop: vh(40)}}
          titleStyle={{fontSize: size.S_20}}
        />
        <Pressable
          onPress={() => {
            onOpen();
          }}
          style={styles.cameraBox}>
          <Image source={images.camera} style={styles.camera} />
        </Pressable>
        <Text style={styles.name}>{userData?.full_name}</Text>
        <Text style={styles.email}>{userData?.email}</Text>
        <View style={styles.separatorView} />
        {DATA.map(renderItem)}
      </ScrollView>
      <Button
        title={strings.log_out}
        activeOpacity={0.8}
        loading={loadingLogout}
        icon={
          <Icon
            type="material"
            size={25}
            color={colors.white}
            name="logout"
            style={{marginRight: vw(10)}}
          />
        }
        iconPosition="left"
        onPress={() => signOut()}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
      />
    </SafeAreaView>
  );
};

export default Profile;

type ProfileOption = {
  id: number;
  title: string;
  navigationScreen: string;
  image: ImageProps;
  params?: object;
};

const DATA: ProfileOption[] = [
  {
    id: 0,
    title: strings.update_profile,
    navigationScreen: 'ComingSoon',
    image: images.updateProfile,
  },
  {
    id: 1,
    title: strings.settings,
    navigationScreen: 'ComingSoon',
    image: images.settings,
  },
  {
    id: 2,
    title: strings.privacy_policy,
    navigationScreen: screens.MyWebView,
    image: images.privacyPolicy,
    params: {
      title: strings.privacy_policy,
    },
  },
  {
    id: 3,
    title: strings.terms_n_cond,
    navigationScreen: screens.MyWebView,
    image: images.termsCondition,
    params: {
      title: strings.terms_n_cond,
    },
  },
  {
    id: 4,
    title: strings.help_n_support,
    navigationScreen: 'ComingSoon',
    image: images.help_support,
  },
  {
    id: 5,
    title: strings.change_password,
    navigationScreen: screens.ChangePassword,
    image: images.padlock,
  },
  {
    id: 6,
    title: strings.choose_language,
    navigationScreen: 'ComingSoon',
    image: images.translate,
  },
];
