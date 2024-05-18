import React, {FC, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Image,
  Text,
  View,
  ImageProps,
} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import {ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {NavigationType} from '../../Types';
import {supabase} from '../../lib/supabase';
import Router from '../../navigator/routes';
import Toast from 'react-native-toast-message';
import {vw} from '../../constants/dimensions';
import {reset} from '../../features/Auth/authSlice';
import {colors, images} from '../../constants';
import {styles} from './styles';

interface Props {
  navigation: NavigationType;
}

const Profile: FC<Props> = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const {userData} = useAppSelector(state => state.Auth);

  const signOut = async () => {
    setLoading(true);
    try {
      const {error} = await supabase.auth.signOut();
      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoading(false);
      } else {
        dispatch(reset());
        Router.resetNew(navigation, 'SignIn');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  // {userData?.name
  //   ?.trim()
  //   .match(/\b(\w)/g)
  //   .join('')
  //   .substring(0, 4)}

  const renderItem = (item: ProfileOption) => {
    return (
      <Pressable
        key={item.id.toString()}
        onPress={() => {
          navigation.navigate(item.navigationScreen);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Pressable onPress={() => {}} style={styles.profileBox}>
          <Image source={images.ram_profile} style={styles.profilePic} />
        </Pressable>
        <Text style={styles.name}>{userData?.full_name}</Text>
        <Text style={styles.email}>{userData?.email}</Text>
        <View style={styles.separatorView} />
        {DATA.map(renderItem)}
      </ScrollView>
      <Button
        title={'Log Out'}
        activeOpacity={0.8}
        loading={loading}
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
};

const DATA: ProfileOption[] = [
  {
    id: 0,
    title: 'Update Profile',
    navigationScreen: 'ComingSoon',
    image: images.updateProfile,
  },
  {
    id: 1,
    title: 'Settings',
    navigationScreen: 'ComingSoon',
    image: images.settings,
  },
  {
    id: 2,
    title: 'Privacy Policy',
    navigationScreen: 'ComingSoon',
    image: images.privacyPolicy,
  },
  {
    id: 3,
    title: 'Terms & Conditions',
    navigationScreen: 'ComingSoon',
    image: images.termsCondition,
  },
  {
    id: 4,
    title: 'Help & Support',
    navigationScreen: 'ComingSoon',
    image: images.help_support,
  },
  {
    id: 5,
    title: 'Choose Language',
    navigationScreen: 'ComingSoon',
    image: images.translate,
  },
];
