import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {NavigationType} from '../../../Types';
import {supabase} from '../../../lib/supabase';
import Toast from 'react-native-toast-message';
import Router from '../../../navigator/routes';
import {vh, vw} from '../../../constants/dimensions';
import {colors, fonts, size, strings} from '../../../constants';

interface Props {
  navigation: NavigationType;
}

const ChangePassword: FC<Props> = props => {
  const {navigation} = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const [visible_1, setVisible_1] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isEmpty = Boolean(password) && Boolean(confirmPassword);

  const updatePassword = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error(strings.err_new_password);
      }
      const {error} = await supabase.auth.updateUser({password: password});
      if (error) {
        Toast.show({type: 'error', text2: error.message});
        setLoading(false);
      } else {
        Router.resetNew(navigation, 'SignIn');
        Toast.show({
          type: 'success',
          text2: strings.password_updt_successfully,
        });
        setLoading(false);
      }
    } catch (err: any) {
      Toast.show({type: 'error', text2: err.message});
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder={strings.new_password}
        containerStyle={styles.inputStyle}
        selectionColor={colors.primary}
        secureTextEntry={visible}
        maxLength={16}
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
      <Input
        placeholder={strings.confirm_password}
        containerStyle={styles.inputStyle}
        selectionColor={colors.primary}
        maxLength={16}
        secureTextEntry={visible_1}
        leftIcon={{
          type: 'font-awesome',
          size: vw(25),
          name: 'lock',
          color: colors.primary,
        }}
        rightIcon={{
          type: 'font-awesome-5',
          size: vw(20),
          name: visible_1 ? 'eye-slash' : 'eye',
          color: colors.primary,
          onPress: () => setVisible_1(!visible_1),
          activeOpacity: 0.8,
        }}
        onChangeText={val => {
          setConfirmPassword(val);
        }}
        value={confirmPassword}
        autoCapitalize={'none'}
      />
      <Button
        title={strings.confirm}
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

export default ChangePassword;

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
