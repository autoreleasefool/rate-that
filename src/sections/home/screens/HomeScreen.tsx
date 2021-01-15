import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({}: Props) => {
  return (
    <Box flex={1}>
      <Text>Hello, world!</Text>
    </Box>
  );
};
