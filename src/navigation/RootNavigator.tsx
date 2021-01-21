import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {HomeNavigator} from './HomeNavigator';
import {NotebookModalNavigator} from './NotebookModalNavigator';
import {RatingModalNavigator} from './RatingModalNavigator';
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
      <RootStack.Screen name="AddRating" component={RatingModalNavigator} options={{stackPresentation: 'modal'}} />
    </RootStack.Navigator>
  );
};
