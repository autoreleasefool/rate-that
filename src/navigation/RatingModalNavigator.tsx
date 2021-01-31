import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useTheme} from '@shopify/restyle';
import {AddRatingStackParamList} from 'sections/ratings/routes';
import {AddRatingScreen} from 'sections/ratings/screens/AddRatingScreen';
import {Theme} from 'shared/theme';

const Stack = createNativeStackNavigator<AddRatingStackParamList>();

export const RatingModalNavigator = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.textPrimary,
      }}
    >
      <Stack.Screen name="Add" component={AddRatingScreen} options={{headerTitle: 'Add rating'}} />
      <Stack.Screen name="Edit" component={AddRatingScreen} options={{headerTitle: 'Edit rating'}} />
    </Stack.Navigator>
  );
};
