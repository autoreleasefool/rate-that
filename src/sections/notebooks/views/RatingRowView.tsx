import React from 'react';
import {Pressable} from 'react-native';
import {format as formatDate, isSameYear} from 'date-fns';
import {RatingBar} from 'sections/ratings/views/RatingBar';
import {Box, FastImage, Icon, Text} from 'shared/components';
import {Rating} from 'shared/data/local/schema';
import {formatRatingImageUrl} from 'shared/data/local/util/ratingUtil';

export type RatingFragment = Pick<Rating, 'updatedAt' | 'value' | 'imageUrl' | 'title'>;

type Props = RatingFragment & {
  isFirstItem: boolean;
  isLastItem: boolean;
  onPress: () => void;
};

export const RatingRowView = ({updatedAt, value, imageUrl, title, isFirstItem, isLastItem, onPress}: Props) => {
  const topBorderRadius = isFirstItem ? 'large' : undefined;
  const bottomBorderRadius = isLastItem ? 'large' : undefined;

  let ratingUpdatedAt: string;
  const now = new Date();
  if (isSameYear(now, updatedAt)) {
    ratingUpdatedAt = formatDate(updatedAt, 'MMMM d');
  } else {
    ratingUpdatedAt = formatDate(updatedAt, 'MMMM d, yyyy');
  }
  const currentRating = `${value} / 10`;

  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <Box
          flexDirection="row"
          backgroundColor={pressed ? 'cardBackgroundPressed' : 'cardBackground'}
          marginTop={isFirstItem ? 'standard' : undefined}
          borderTopLeftRadius={topBorderRadius}
          borderTopRightRadius={topBorderRadius}
          borderBottomLeftRadius={bottomBorderRadius}
          borderBottomRightRadius={bottomBorderRadius}
        >
          {imageUrl ? (
            <FastImage
              source={{uri: formatRatingImageUrl(imageUrl, 'w185')}}
              width={80}
              height={120}
              borderTopLeftRadius={topBorderRadius}
              borderBottomLeftRadius={bottomBorderRadius}
            />
          ) : (
            <Box
              width={80}
              height={120}
              backgroundColor="primary"
              justifyContent="center"
              alignItems="center"
              borderTopLeftRadius={topBorderRadius}
              borderBottomLeftRadius={bottomBorderRadius}
            >
              <Icon name="noImage" color="white" size="medium" />
            </Box>
          )}
          <Box flexDirection="column" margin="small" flex={1}>
            <Text variant="body" fontWeight="bold">
              {title}
            </Text>
            <Text variant="captionSecondary" marginTop="small">
              Rated on {ratingUpdatedAt}
            </Text>
            <Box flex={1} />
            <Text variant="caption" marginBottom="small">
              {currentRating}
            </Text>
            <RatingBar value={value} size="small" disabled />
          </Box>
        </Box>
      )}
    </Pressable>
  );
};
