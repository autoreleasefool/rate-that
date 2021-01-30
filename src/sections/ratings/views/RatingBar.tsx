import React from 'react';
import {Box, IconButton, IconSize} from 'shared/components';

interface Props {
  maximumRating?: number;
  value: number;
  onChangeRating?: (rating: number) => void;
  disabled: boolean;
  size?: IconSize;
}

export const RatingBar = ({maximumRating = 10, size = 'small', disabled, value, onChangeRating}: Props) => {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      {[...Array(maximumRating).keys()].map(i => (
        <IconButton
          key={i}
          name="star"
          color={i < value ? 'highlight' : 'textPrimary'}
          fill={i < value ? 'highlight' : undefined}
          size={size}
          onPress={() => onChangeRating && onChangeRating(i + 1)}
          disabled={disabled}
        />
      ))}
    </Box>
  );
};
