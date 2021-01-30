import {useTheme} from '@shopify/restyle';
import React, {ComponentProps} from 'react';
import {TextInput} from 'react-native';

import {Theme} from '../theme';

interface TextInputProps extends ComponentProps<typeof TextInput> {}

export const TextField = ({style, ...textInputProps}: TextInputProps) => {
  const theme = useTheme<Theme>();
  return (
    <TextInput
      style={[
        {
          fontSize: theme.textVariants.body.fontSize,
          color: theme.colors[theme.textVariants.body.color as keyof Theme['colors']],
          marginTop: theme.spacing.small,
        },
        style,
      ]}
      {...textInputProps}
    />
  );
};
