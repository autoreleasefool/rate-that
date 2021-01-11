import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './routes';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
