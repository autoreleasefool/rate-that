import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useTheme} from '@shopify/restyle';
import {AddNotebookStackParamList} from 'sections/notebooks/routes';
import {AddNotebookScreen} from 'sections/notebooks/screens/AddNotebookScreen';
import {Theme} from 'shared/theme';

const Stack = createNativeStackNavigator<AddNotebookStackParamList>();

export const NotebookModalNavigator = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.textPrimaryContrasting,
      }}
    >
      <Stack.Screen name="Index" component={AddNotebookScreen} options={{headerTitle: 'Add notebook'}} />
    </Stack.Navigator>
  );
};
