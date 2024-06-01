import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {FC} from 'react';
import {NavigationType} from '../../../Types';
import {colors, fonts, screens, size} from '../../../constants';
import {vh, vw} from '../../../constants/dimensions';
import CourseCategory from '../CourseCategory';
import PurchasesCourse from '../PurchasesCourse';

interface Props {
  navigation: NavigationType;
}
const CourseHome: FC<Props> = props => {
  const Tab = createMaterialTopTabNavigator();
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
        <Tab.Screen
          name={screens.CourseCategory}
          component={CourseCategory}
          options={{tabBarLabel: 'Category'}}
        />
        <Tab.Screen
          name={screens.PurchasesCourse}
          component={PurchasesCourse}
          options={{tabBarLabel: 'Purchase'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default CourseHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  text: {
    fontSize: size.S_14,
    color: colors.white,
    fontFamily: fonts.openSansMedium,
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
    width: vw(155),
    height: vh(35),
    borderRadius: vw(12),
    backgroundColor: colors.primary,
    position: 'absolute',
    top: vh(4),
    marginLeft: vw(4),
  },
  tabBarLabel: {
    fontSize: size.S_14,
    textTransform: 'capitalize',
    fontFamily: fonts.openSansRegular,
    textAlign: 'center',
    zIndex: 1,
    top: Platform.OS === 'android' ? vh(-17) : vh(-1),
    position: Platform.OS === 'android' ? 'absolute' : 'relative',
    left: Platform.OS === 'android' ? vw(-35) : vw(0),
  },
});
