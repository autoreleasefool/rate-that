import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {HomeNavigator} from './HomeNavigator';
import {NotebookModalNavigator} from './NotebookModalNavigator';
import {RootStackParamList} from './routes';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        stackPresentation: 'transparentModal',
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Home" component={HomeNavigator} options={{stackAnimation: 'none'}} />
      <RootStack.Screen name="AddNotebook" component={NotebookModalNavigator} options={{stackPresentation: 'modal'}} />
    </RootStack.Navigator>
  );
};
