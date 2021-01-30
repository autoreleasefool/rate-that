import React, {ComponentProps} from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@shopify/restyle';

import {Theme} from '../theme';
import {Icon} from './Icon';

interface Props extends ComponentProps<typeof Icon> {
  onPress: () => void;
  disabled?: boolean;
  colorPressed?: keyof Theme['colors'];
}

export const IconButton = ({onPress, colorPressed, disabled, ...iconProps}: Props) => {
  const theme = useTheme<Theme>();

  return (
    <Pressable onPress={onPress} hitSlop={theme.spacing.small} disabled={disabled}>
      {({pressed}) => {
        const color = pressed && colorPressed ? colorPressed : iconProps.color;
        return <Icon {...iconProps} color={color} />;
      }}
    </Pressable>
  );
};
