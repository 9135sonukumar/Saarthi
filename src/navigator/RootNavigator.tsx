import {Image, Pressable, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, images, screens} from '../constants';
import Splash from '../screens/Splash';
import HomeScreen from '../screens/Home';
import CallScreen from '../screens/VideoSession/Call';
import Profile from '../screens/Profile';
import {vh, vw} from '../constants/dimensions';
import SignIn from '../screens/Onboarding/SignIn';
import SignUp from '../screens/Onboarding/SignUp';
import BottomTabNavigator from './BottomTabNavigator';
import ForgotPassword from '../screens/Onboarding/ForgotPassword';
import ComingSoon from '../screens/ComingSoon';
import MyWebView from '../screens/MyWebView';
import ChangePassword from '../screens/Onboarding/ChangePassword';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screens.Splash}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screens.SignIn}
          component={SignIn}
          options={{headerTitle: 'Sign In'}}
        />
        <Stack.Screen
          name={screens.SignUp}
          component={SignUp}
          options={{headerTitle: 'Sign Up'}}
        />
        <Stack.Screen
          name={screens.ForgotPassword}
          component={ForgotPassword}
          options={{headerTitle: 'Forgot Password'}}
        />
        <Stack.Screen
          name={screens.ChangePassword}
          component={ChangePassword}
          options={{
            headerTintColor: colors.primary,
            headerTitle: 'Change Password',
          }}
        />
        <Stack.Screen
          name={'ComingSoon'}
          component={ComingSoon}
          options={{headerTitle: 'Coming Soon'}}
        />
        <Stack.Screen
          name={screens.BottomTab}
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screens.Call}
          component={CallScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={screens.Profile}
          component={Profile}
          options={{
            headerTintColor: colors.primary,
          }}
        />
        <Stack.Screen
          name={screens.MyWebView}
          component={MyWebView}
          options={{
            headerTintColor: colors.primary,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  leftLogo: {
    width: vw(80),
    height: vh(40),
    resizeMode: 'cover',
  },
  profileBox: {
    width: vw(40),
    height: vw(40),
    borderRadius: vw(20),
    overflow: 'hidden',
  },
  profilePic: {
    width: vw(40),
    height: vw(40),
    resizeMode: 'cover',
  },
});

export default RootNavigator;
