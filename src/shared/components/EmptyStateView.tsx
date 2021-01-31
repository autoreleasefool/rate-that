import React from 'react';

import {Box} from './Box';
import {Text} from './Text';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export const EmptyStateView = ({title, subtitle}: EmptyStateProps) => {
  return (
    <Box
      flex={1}
      marginTop="extraLarge"
      marginBottom="standard"
      marginHorizontal="standard"
      justifyContent="center"
      alignItems="center"
    >
      <Text variant="subheader">{title}</Text>
      {subtitle ? (
        <Text variant="body" marginTop="standard">
          {subtitle}
        </Text>
      ) : null}
    </Box>
  );
};
