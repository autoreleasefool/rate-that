import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useTheme} from '@shopify/restyle';
import {HomeScreen} from 'sections/home/screens/HomeScreen';
import {NotebookDetailsScreen} from 'sections/notebooks/screens/NotebookDetailsScreen';
import {Theme} from 'shared/theme';
import {HomeStackParamList} from 'sections/home/routes';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.textPrimaryContrasting,
      }}
    >
      <Stack.Screen name="Index" component={HomeScreen} options={{headerTitle: 'Home'}} />
      <Stack.Screen name="NotebookDetails" component={NotebookDetailsScreen} />
    </Stack.Navigator>
  );
};
