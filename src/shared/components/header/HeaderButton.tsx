import React from 'react';
import {Pressable} from 'react-native';

import {Text} from '../Text';

interface HeaderButtonProps {
  title: string;
  onPress: () => void;
}

export const HeaderButton = ({title, onPress}: HeaderButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <Text padding="m" variant="body" color={pressed ? 'textSecondaryContrasting' : 'textPrimaryContrasting'}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};
