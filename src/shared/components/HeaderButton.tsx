import React from 'react';
import {Pressable} from 'react-native';

import {Box} from './Box';
import {Icon, IconName} from './Icon';
import {Text} from './Text';

interface HeaderButtonProps {
  title?: string;
  icon?: IconName;
  onPress: () => void;
}

export const HeaderButton = ({title, icon, onPress}: HeaderButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => {
        const color = pressed ? 'textSecondary' : 'textPrimary';
        return (
          <Box flexDirection="row">
            {title && (
              <Text variant="body" color={color}>
                {title}
              </Text>
            )}
            {icon && <Icon name={icon} color={color} size="header" />}
          </Box>
        );
      }}
    </Pressable>
  );
};
