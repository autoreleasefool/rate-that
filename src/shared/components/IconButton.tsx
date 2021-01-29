import React, {ComponentProps} from 'react';
import {Pressable} from 'react-native';
import {Theme} from 'shared/theme';

import {Box} from './Box';
import {Icon} from './Icon';

interface Props extends ComponentProps<typeof Icon> {
  onPress: () => void;
  disabled?: boolean;
  colorPressed?: keyof Theme['colors'];
}

export const IconButton = ({onPress, colorPressed, disabled, ...iconProps}: Props) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({pressed}) => {
        const color = pressed && colorPressed ? colorPressed : iconProps.color;
        return (
          <Box padding="small">
            <Icon {...iconProps} color={color} />
          </Box>
        );
      }}
    </Pressable>
  );
};
