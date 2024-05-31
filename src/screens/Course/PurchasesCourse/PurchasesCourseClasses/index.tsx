import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LiveClass from './LiveClass';
import DoubtClass from './DoubtClass';
import {colors, fonts, size} from '../../../../constants';
import RecordedClassStack from '../RecordedClassStack';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import {vh, vw} from '../../../../constants/dimensions';

const Tab = createMaterialTopTabNavigator();

const PurchasesCourseClasses = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.primary,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarPressColor: 'transparent',
          swipeEnabled: false,
          tabBarAndroidRipple: {
            radius: 0,
          },
        }}>
        <Tab.Screen name="Recorded" component={RecordedClassStack} />
        <Tab.Screen name="Live" component={LiveClass} />
        <Tab.Screen name="Doubt" component={DoubtClass} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default PurchasesCourseClasses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabBarStyle: {
    width: vw(335),
    height: vw(44),
    alignSelf: 'center',
    marginTop: vh(10),
    marginBottom: vh(15),
    borderRadius: vw(12),
    borderWidth: vw(1),
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  tabBarIndicator: {
    width: vw(95),
    height: vh(36),
    borderRadius: vw(12),
    backgroundColor: colors.primary,
    position: 'absolute',
    top: vh(3.5),
    marginLeft: vw(6),
  },
  tabBarLabel: {
    fontSize: size.S_14,
    textTransform: 'capitalize',
    fontFamily: fonts.openSansRegular,
    textAlign: 'center',
    zIndex: 1,
    top: Platform.OS === 'android' ? vh(-5) : vh(-1),
    // position: Platform.OS === 'android' ? 'absolute' : 'relative',
    // left: Platform.OS === 'android' ? vw(-0) : vw(0),
  },
});
