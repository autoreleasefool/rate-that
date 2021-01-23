import React from 'react';
import {Box} from './Box';
import {Text} from './Text';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export const EmptyStateView = ({title, subtitle}: EmptyStateProps) => {
  return (
    <Box flex={1}>
      <Box margin="standard">
        <Text variant="header">{title}</Text>
        {subtitle ? (
          <Text variant="body" marginTop="standard">
            {subtitle}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
};
