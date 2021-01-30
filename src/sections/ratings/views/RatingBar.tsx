import React from 'react';
import {Box, IconButton} from 'shared/components';

interface Props {
  maximumRating?: number;
  value: number;
  onChangeRating: (rating: number) => void;
}

export const RatingBar = ({maximumRating = 10, value, onChangeRating}: Props) => {
  return (
    <Box flex={1} flexDirection="row" justifyContent="space-between" backgroundColor="cardBackground">
      {[...Array(maximumRating).keys()].map(i => (
        <IconButton
          key={i}
          name="star"
          color={i < value ? 'highlight' : 'textPrimary'}
          fill={i < value ? 'highlight' : undefined}
          size="small"
          onPress={() => onChangeRating(i + 1)}
        />
      ))}
    </Box>
  );
};
