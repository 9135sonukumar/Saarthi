import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type NavigationType = NativeStackNavigationProp<ParamListBase>;
export type RouteType = RouteProp<ParamListBase>;
export type Table =
  | 'CategoryMatser'
  | 'User'
  | 'Address'
  | 'CourseCategoryMaster';
