import {useTheme} from '@shopify/restyle';
import React, {ComponentProps} from 'react';
import {TextInput} from 'react-native';

import {Theme} from '../theme';
import {Box} from './Box';
import {Text} from './Text';

interface TextInputProps extends ComponentProps<typeof TextInput> {
  title: string;
}

export const TextField = ({style, title, ...textInputProps}: TextInputProps) => {
  const theme = useTheme<Theme>();
  return (
    <Box backgroundColor="cardBackground" padding="standard" flexDirection="column">
      <Text variant="body" fontWeight="bold">
        {title}
      </Text>
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
    </Box>
  );
};
