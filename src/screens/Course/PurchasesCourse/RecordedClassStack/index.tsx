import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecordedClass from '../PurchasesCourseClasses/RecordedClass/RecordedClass';
import RecordedClassDetail from '../PurchasesCourseClasses/RecordedClass/RecordedClassDetail';

const Stack = createNativeStackNavigator();

const RecordedClassStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecordedClass"
        component={RecordedClass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecordedClassDetail"
        component={RecordedClassDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RecordedClassStack;
