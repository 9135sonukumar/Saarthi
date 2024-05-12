import React, {FC} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {NavigationType} from '../../Types';
import {vw} from '../../constants/dimensions';
import {colors, images} from '../../constants';

interface Props {
  navigation: NavigationType;
}

const Profile: FC<Props> = props => {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Pressable onPress={() => {}} style={styles.profileBox}>
        <Image source={images.ram_profile} style={styles.profilePic} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  profileBox: {
    width: vw(100),
    height: vw(100),
    borderRadius: vw(50),
    overflow: 'hidden',
  },
  profilePic: {
    width: vw(100),
    height: vw(100),
    resizeMode: 'cover',
  },
});
