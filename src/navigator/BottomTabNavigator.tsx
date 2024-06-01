import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '../hooks';
import HomeScreen from '../screens/Home';
import Avatar from '../components/Avatar';
import {vh, vw} from '../constants/dimensions';
import SaarthiMart from '../screens/Mart/SaarthiMart';
import CallHome from '../screens/VideoSession/CallHome';
import {colors, fonts, images, screens, size} from '../constants';

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const {userData, avatar_url} = useAppSelector(state => state.Auth);

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
        tabBarLabelStyle: {
          fontSize: size.S_12,
          fontFamily: fonts.openSansMedium,
          marginTop: vw(-5),
        },
      }}>
      <BottomTab.Screen
        name={screens.Home}
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerShadowVisible: true,
          headerLeft(props) {
            return <Image source={images.logo_sqr} style={styles.leftLogo} />;
          },
          headerRight(props) {
            return (
              <Avatar
                userName={userData?.full_name}
                url={avatar_url}
                size={40}
                style={styles.avatar}
                onImagePress={() => navigation.navigate(screens.Profile)}
              />
            );
          },
          tabBarIcon({focused}) {
            return (
              <Image
                source={focused ? images.home_fill : images.home_unfill}
                style={[
                  styles.iconHStyle,
                  {tintColor: focused ? colors.primary : colors.black},
                ]}
              />
            );
          },
        })}
      />
      <BottomTab.Screen
        name={screens.CallHome}
        component={CallHome}
        options={({navigation}) => ({
          headerTitle: '',
          headerShadowVisible: true,
          headerLeft(props) {
            return <Image source={images.logo_sqr} style={styles.leftLogo} />;
          },
          headerRight(props) {
            return (
              <Avatar
                userName={userData?.full_name}
                url={avatar_url}
                size={40}
                style={styles.avatar}
                onImagePress={() => navigation.navigate(screens.Profile)}
              />
            );
          },
          tabBarLabel: 'Live',
          tabBarIcon({focused}) {
            return (
              <Image
                source={
                  focused ? images.video_call_fill : images.video_call_unfill
                }
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.primary : colors.black},
                ]}
              />
            );
          },
        })}
      />
      <BottomTab.Screen
        name={screens.SaarthiMart}
        component={SaarthiMart}
        options={({navigation}) => ({
          headerTitle: '',
          headerShadowVisible: true,
          headerLeft(props) {
            return <Image source={images.logo_sqr} style={styles.leftLogo} />;
          },
          headerRight(props) {
            return (
              <Avatar
                userName={userData?.full_name}
                url={avatar_url}
                size={40}
                style={styles.avatar}
                onImagePress={() => navigation.navigate(screens.Profile)}
              />
            );
          },
          tabBarLabel: 'Mart',
          tabBarIcon({focused}) {
            return (
              <Image
                source={focused ? images.cart_fill : images.cart_unfill}
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.primary : colors.black},
                ]}
              />
            );
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
const styles = StyleSheet.create({
  leftLogo: {
    width: vw(80),
    height: vh(40),
    marginLeft: vw(10),
    resizeMode: 'cover',
  },
  avatar: {
    marginRight: vw(10),
  },
  iconStyle: {
    width: vw(25),
    height: vh(25),
    resizeMode: 'contain',
  },
  iconHStyle: {
    width: vw(20),
    height: vh(20),
    resizeMode: 'contain',
  },
});
