import React, {FC, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {styles} from './styles';
import {Button, Input} from '@rneui/themed';
import {NavigationType} from '../../../Types';
import {supabase} from '../../../lib/supabase';
import Toast from 'react-native-toast-message';
import {vh} from '../../../constants/dimensions';
import {colors, screens, strings} from '../../../constants';

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
          placeholder={strings.enter_ur_full_n}
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
          placeholder={strings.enter_ur_mb}
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
          placeholder={strings.enter_ur_full_add}
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
          placeholder={strings.enter_ur_email}
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
          placeholder={strings.password}
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
        title={strings.sign_up}
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
