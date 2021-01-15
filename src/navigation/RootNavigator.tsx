import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from 'sections/home/screens/HomeScreen';
import {RootStackParamList} from './routes';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle: 'Home'}} />
    </Stack.Navigator>
  );
};
