import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationType} from '../../../Types';
import {SafeAreaView} from 'react-native';
import {colors, fonts, size} from '../../../constants';
import {Button, Input} from '@rneui/themed';
import {vh, vw} from '../../../constants/dimensions';
import {supabase} from '../../../lib/supabase';
import Toast from 'react-native-toast-message';

interface Props {
  navigation: NavigationType;
}

const ForgotPassword: FC<Props> = props => {
  const {navigation} = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);

  const isEmpty = Boolean(password);

  const updatePassword = async () => {
    setLoading(true);
    try {
      const {error} = await supabase.auth.updateUser({password: password});
      //   const {error} = await supabase.auth.resetPasswordForEmail(
      //     'sonukumarbgs9135@gmail.com',
      //   );
      console.log(error);
      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoading(false);
      } else {
        // navigation.pop();
        Toast.show({type: 'success', text2: 'Password update successfully!'});
        setLoading(false);
      }
    } catch (err: any) {
      console.log('err===>>>', err.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder={'New password'}
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
        value={password}
        autoCapitalize={'none'}
      />
      <Button
        title={'Confirm'}
        activeOpacity={0.8}
        disabled={!isEmpty}
        disabledStyle={{backgroundColor: colors.disable}}
        loading={loading}
        onPress={() => updatePassword()}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
      />
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputStyle: {
    width: vw(330),
    alignSelf: 'center',
    marginTop: vh(20),
  },
  buttonStyle: {
    width: vw(330),
    height: vh(44),
    borderRadius: vw(20),
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  titleStyle: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
  },
});
