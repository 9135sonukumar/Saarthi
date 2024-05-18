import React, {FC, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {colors, fonts, screens, size} from '../../../constants';
import {NavigationType} from '../../../Types';
import {Button, Input} from '@rneui/themed';
import {vh, vw} from '../../../constants/dimensions';
import {supabase} from '../../../lib/supabase';
import {ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';

interface Props {
  navigation: NavigationType;
}

const SignUp: FC<Props> = props => {
  const {navigation} = props;
  const [name, setName] = useState('');
  const [mobile, setmobile] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const {
        data: {session},
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
            mobile_number: mobile,
            avatar_url: 'https://example/avtar/image',
            address: address,
          },
        },
      });

      if (error) {
        Toast.show({type: 'error', text2: error.message});
      } else if (session) {
        navigation.navigate(screens.SignIn);
      }
      setLoading(false);
    } catch (err: any) {
      console.warn(err.message);
      setLoading(false);
    }
  }

  const isEmpty =
    Boolean(name) &&
    Boolean(mobile) &&
    Boolean(address) &&
    Boolean(email) &&
    Boolean(password);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: vh(30), paddingBottom: vh(30)}}>
        <Input
          placeholder={'Enter your full name'}
          onChangeText={val => {
            setName(val);
          }}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputBoxStyle}
          selectionColor={colors.primary}
          value={name}
          autoCapitalize={'none'}
        />
        <Input
          placeholder={'Enter your mobile number'}
          onChangeText={val => {
            setmobile(val);
          }}
          inputStyle={styles.inputStyle}
          maxLength={10}
          containerStyle={styles.inputBoxStyle}
          selectionColor={colors.primary}
          keyboardType={'phone-pad'}
          value={mobile}
          autoCapitalize={'none'}
        />
        <Input
          placeholder={'Enter your full address'}
          onChangeText={val => {
            setAddress(val);
          }}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputBoxStyle}
          selectionColor={colors.primary}
          value={address}
          autoCapitalize={'none'}
        />
        <Input
          placeholder={'Enter your email Id'}
          onChangeText={val => {
            setEmail(val);
          }}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputBoxStyle}
          selectionColor={colors.primary}
          keyboardType={'email-address'}
          value={email}
          autoCapitalize={'none'}
        />
        <Input
          placeholder={'Password'}
          containerStyle={styles.inputBoxStyle}
          selectionColor={colors.primary}
          secureTextEntry
          onChangeText={val => {
            setPassword(val);
          }}
          inputStyle={styles.inputStyle}
          value={password}
          autoCapitalize={'none'}
        />
      </ScrollView>
      <Button
        title={'Sign Up'}
        activeOpacity={0.8}
        loading={loading}
        disabled={!isEmpty}
        disabledStyle={{backgroundColor: colors.disable}}
        onPress={() => signUpWithEmail()}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
      />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
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
