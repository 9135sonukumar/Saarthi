import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, fonts, images, screens, size} from '../constants';
import HomeScreen from '../screens/Home';
import {Image, Pressable, StyleSheet} from 'react-native';
import {vh, vw} from '../constants/dimensions';
import SaarthiMart from '../screens/Mart/SaarthiMart';
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
              <Pressable
                onPress={() => {
                  navigation.navigate(screens.Profile);
                }}
                style={styles.profileBox}>
                <Image source={images.ram_profile} style={styles.profilePic} />
              </Pressable>
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
              <Pressable
                onPress={() => {
                  navigation.navigate(screens.Profile);
                }}
                style={styles.profileBox}>
                <Image source={images.ram_profile} style={styles.profilePic} />
              </Pressable>
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
              <Pressable
                onPress={() => {
                  navigation.navigate(screens.Profile);
                }}
                style={styles.profileBox}>
                <Image source={images.ram_profile} style={styles.profilePic} />
              </Pressable>
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
  profileBox: {
    width: vw(40),
    height: vw(40),
    marginRight: vw(10),
    borderRadius: vw(20),
    overflow: 'hidden',
  },
  profilePic: {
    width: vw(40),
    height: vw(40),
    resizeMode: 'cover',
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
