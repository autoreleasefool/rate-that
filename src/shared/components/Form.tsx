import React from 'react';
import {ScrollView} from 'react-native';

import {Box} from './Box';
import {Divider} from './Divider';
import {Text} from './Text';

interface FormProps {
  children?: React.ReactNode;
}

export const Form = ({children}: FormProps) => {
  return (
    <ScrollView keyboardDismissMode="on-drag">
      <Box flex={1}>
        {React.Children.map(children, child => (
          <>
            {child}
            <Divider style="full" />
          </>
        ))}
      </Box>
    </ScrollView>
  );
};

interface FormElementProps {
  children: React.ReactNode;
  style?: 'stacked' | 'inline';
  title?: string;
  caption?: string;
}

export const FormElement = ({children, style = 'stacked', title, caption}: FormElementProps) => {
  const isInline = style === 'inline';

  return (
    <Box
      flexDirection={isInline ? 'row' : 'column'}
      padding="standard"
      justifyContent={isInline ? 'space-between' : undefined}
      alignItems={isInline ? 'center' : undefined}
      backgroundColor="cardBackground"
    >
      <Box flexDirection="column">
        {title && (
          <Text
            variant="body"
            fontWeight="bold"
            marginBottom={caption === undefined && !isInline ? 'standard' : undefined}
          >
            {title}
          </Text>
        )}
        {caption && (
          <Text
            variant="caption"
            marginLeft={isInline ? 'standard' : undefined}
            marginTop={isInline ? undefined : 'small'}
            marginBottom={isInline ? undefined : 'standard'}
          >
            {caption}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};
