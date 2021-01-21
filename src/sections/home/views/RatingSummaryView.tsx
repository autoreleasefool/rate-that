import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {Rating} from 'shared/data/schema';

interface Props {
  rating: Rating | 'placeholder';
  onPress: (rating?: Rating) => void;
}

export const RatingSummaryView = ({rating, onPress}: Props) => {
  const commonOnPress = useCallback(() => {
    if (rating === 'placeholder') {
      onPress();
    } else {
      onPress(rating);
    }
  }, [rating, onPress]);

  return (
    <Pressable onPress={commonOnPress}>
      <Box width={80} height={120} backgroundColor="primary" margin="m" alignItems="center" justifyContent="center">
        {rating === 'placeholder' ? <Text variant="header">+</Text> : <Text variant="header">{rating.value}</Text>}
      </Box>
    </Pressable>
  );
};