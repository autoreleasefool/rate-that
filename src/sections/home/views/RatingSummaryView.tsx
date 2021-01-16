import React from 'react';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {Rating} from 'shared/data/schema';

interface Props {
  rating: Rating;
}

export const RatingSummaryView = ({rating}: Props) => {
  return (
    <Box width={80} height={120} backgroundColor="primary" margin="m" alignItems="center" justifyContent="center">
      <Text variant="header">{rating.value}</Text>
    </Box>
  );
};
