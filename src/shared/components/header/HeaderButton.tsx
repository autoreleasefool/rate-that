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
      {({pressed}) => {
        const color = pressed ? 'textSecondaryContrasting' : 'textPrimaryContrasting';
        return (
          <Text variant="body" color={color}>
            {title}
          </Text>
        );
      }}
    </Pressable>
  );
};
