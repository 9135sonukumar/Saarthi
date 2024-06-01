import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '../hooks';
import HomeScreen from '../screens/Home';
import Avatar from '../components/Avatar';
import {vh, vw} from '../constants/dimensions';
import SaarthiMart from '../screens/Mart/SaarthiMart';
import CallHome from '../screens/VideoSession/CallHome';
import {colors, fonts, images, screens, size} from '../constants';
import CourseHome from '../screens/Course/CourseHome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CourseList from '../screens/Course/CourseList';
import CourseDetails from '../screens/Course/CourseDetails';
import PurchasesCourseClasses from '../screens/Course/PurchasesCourse/PurchasesCourseClasses';
import RecordedClassDetail from '../screens/Course/PurchasesCourse/PurchasesCourseClasses/RecordedClass/RecordedClassDetail';

const BottomTab = createBottomTabNavigator();
const CourseStack = createNativeStackNavigator();
const CourseStackScreen = () => (
  <CourseStack.Navigator>
    <CourseStack.Screen
      name={screens.CourseHome}
      component={CourseHome}
      options={{headerShown: false}}
    />
    <CourseStack.Screen
      name={screens.CourseList}
      component={CourseList}
      options={{headerShown: false}}
    />
    <CourseStack.Screen
      name={screens.CourseDetails}
      component={CourseDetails}
      options={{headerShown: false}}
    />
    <CourseStack.Screen
      name={screens.PurchasesCourseClasses}
      component={PurchasesCourseClasses}
      options={{headerShown: false}}
    />
  </CourseStack.Navigator>
);
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
        name="CourseStackScreen"
        component={CourseStackScreen}
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
          tabBarLabel: 'Course',
          tabBarIcon({focused}) {
            return (
              <Image
                source={focused ? images.course_fill : images.course_unfill}
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
