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
  inline?: boolean;
  title?: string;
  caption?: string;
}

export const FormElement = ({children, inline, title, caption}: FormElementProps) => {
  return (
    <Box
      flexDirection={inline ? 'row' : 'column'}
      padding="standard"
      justifyContent={inline ? 'space-between' : undefined}
      alignItems={inline ? 'center' : undefined}
      backgroundColor="cardBackground"
    >
      <Box flexDirection="column">
        {title && (
          <Text
            variant="body"
            fontWeight="bold"
            marginBottom={caption === undefined && !inline ? 'standard' : undefined}
          >
            {title}
          </Text>
        )}
        {caption && (
          <Text
            variant="caption"
            marginLeft={inline ? 'standard' : undefined}
            marginTop={inline ? undefined : 'small'}
            marginBottom={inline ? undefined : 'standard'}
          >
            {caption}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};
