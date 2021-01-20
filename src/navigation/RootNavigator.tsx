import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@shopify/restyle';
import {HomeScreen} from 'sections/home/screens/HomeScreen';
import {Theme} from 'shared/theme';

import {RootStackParamList} from './routes';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.textPrimaryContrasting,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle: 'Home'}} />
    </Stack.Navigator>
  );
};
