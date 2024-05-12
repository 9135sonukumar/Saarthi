import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, screens} from '../constants';
import HomeScreen from '../screens/Home';
import CallScreen from '../screens/Call';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screens.Home}
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: '',
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
                  <Image
                    source={images.ram_profile}
                    style={styles.profilePic}
                  />
                </Pressable>
              );
            },
          })}
        />
        <Stack.Screen
          name={screens.Call}
          component={CallScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={screens.Profile} component={Profile} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  leftLogo: {
    width: 80,
    height: 40,
    resizeMode: 'cover',
  },
  profileBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profilePic: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});

export default RootNavigator;
