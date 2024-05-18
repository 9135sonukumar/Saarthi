import React, {FC, useState} from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';
import {Input, Button} from '@rneui/themed';
import {useAppDispatch} from '../../../hooks';
import {NavigationType} from '../../../Types';
import Router from '../../../navigator/routes';
import Toast from 'react-native-toast-message';
import {supabase} from '../../../lib/supabase';
import {vh, vw} from '../../../constants/dimensions';
import {saveAuth} from '../../../features/Auth/authSlice';
import {colors, images, screens, strings} from '../../../constants';

interface Props {
  navigation: NavigationType;
}

const SignIn: FC<Props> = props => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const dispatch = useAppDispatch();

  async function signInWithEmail() {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const {
        error,
        data: {session},
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setLoading(false);
        Toast.show({type: 'error', text2: error.message});
      } else {
        console.log(session);
        let payload = {
          token: session?.access_token,
          user: session?.user,
          user_metadata: session?.user.user_metadata,
        };
        dispatch(saveAuth(payload));
        Router.resetNew(navigation, 'BottomTab');
        Toast.show({type: 'success', text2: strings.login_successfully});
        setLoading(false);
      }
    } catch (err: any) {
      Toast.show({type: 'error', text2: err.message});
      setLoading(false);
    }
  }

  const isEmpty = Boolean(email) && Boolean(password);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.logo_sqr} style={styles.logo_sqr} />
      <View style={{marginTop: vh(120)}}>
        <Input
          placeholder={'example@gmail.com'}
          onChangeText={val => {
            setEmail(val);
          }}
          leftIcon={{
            type: 'font-awesome',
            size: 25,
            name: 'user',
            color: colors.primary,
          }}
          containerStyle={styles.inputStyle}
          selectionColor={colors.primary}
          keyboardType={'email-address'}
          value={email}
          autoCapitalize={'none'}
        />
        <Input
          placeholder={'Password'}
          containerStyle={styles.inputStyle}
          selectionColor={colors.primary}
          secureTextEntry={visible}
          leftIcon={{
            type: 'font-awesome',
            size: vw(25),
            name: 'lock',
            color: colors.primary,
          }}
          rightIcon={{
            type: 'font-awesome-5',
            size: vw(20),
            name: visible ? 'eye-slash' : 'eye',
            color: colors.primary,
            onPress: () => setVisible(!visible),
            activeOpacity: 0.8,
          }}
          onChangeText={val => {
            setPassword(val);
          }}
          onSubmitEditing={() => {
            isEmpty && signInWithEmail();
          }}
          value={password}
          autoCapitalize={'none'}
        />
        <Pressable
          style={styles.forgotBttn}
          onPress={() => {
            navigation.navigate('ComingSoon');
          }}>
          <Text style={styles.forgot}>{strings.forgot_password}</Text>
        </Pressable>
      </View>
      <Button
        title={'Sign In'}
        activeOpacity={0.8}
        disabled={!isEmpty}
        disabledStyle={{backgroundColor: colors.disable}}
        loading={loading}
        onPress={() => signInWithEmail()}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
      />
      <Pressable
        style={{marginTop: vh(15)}}
        onPress={() => navigation.navigate(screens.SignUp)}>
        <Text style={styles.dontHave}>{strings.dont_have_acc}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignIn;
