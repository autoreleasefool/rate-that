import React from 'react';
import {Pressable} from 'react-native';
import {Theme} from 'shared/theme';

import {Box} from './Box';
import {Icon, IconName} from './Icon';
import {Text} from './Text';

interface HeaderButtonProps {
  title?: string;
  icon?: IconName;
  onPress: () => void;
  disabled?: boolean;
}

export const HeaderButton = ({title, icon, onPress, disabled}: HeaderButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({pressed}) => {
        let color: keyof Theme['colors'];
        if (disabled) {
          color = 'textSecondary';
        } else {
          color = pressed ? 'textSecondary' : 'textPrimary';
        }

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
