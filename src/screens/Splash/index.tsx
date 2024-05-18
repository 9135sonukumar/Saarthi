import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationType} from '../../Types';
import Router from '../../navigator/routes';
import {useAppSelector} from '../../hooks';

interface Props {
  navigation: NavigationType;
}

const Splash: FC<Props> = props => {
  const {navigation} = props;

  const {token} = useAppSelector(state => state.Auth);

  useEffect(() => {
    if (token !== null) {
      Router.resetNew(navigation, 'BottomTab');
    } else {
      Router.resetNew(navigation, 'SignIn');
    }
  }, []);

  return <View />;
};

export default Splash;

const styles = StyleSheet.create({});
