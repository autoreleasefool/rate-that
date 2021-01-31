import React from 'react';
import {Pressable} from 'react-native';
import {format as formatDate, isSameYear} from 'date-fns';
import {RatingBar} from 'sections/ratings/views/RatingBar';
import {Box, FastImage, Icon, Text} from 'shared/components';
import {Rating} from 'shared/data/local/schema';
import {formatPosterPath} from 'shared/util/formatMovie';

interface Props {
  rating: Rating;
  isFirstItem: boolean;
  isLastItem: boolean;
}

export const RatingRowView = ({rating, isFirstItem, isLastItem}: Props) => {
  const topBorderRadius = isFirstItem ? 'large' : undefined;
  const bottomBorderRadius = isLastItem ? 'large' : undefined;

  let ratingUpdatedAt: string;
  const now = new Date();
  if (isSameYear(now, rating.updatedAt)) {
    ratingUpdatedAt = formatDate(rating.updatedAt, 'MMMM d');
  } else {
    ratingUpdatedAt = formatDate(rating.updatedAt, 'MMMM d, yyyy');
  }
  const currentRating = `${rating.value} / 10`;

  return (
    <Pressable>
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
          {rating.movieBasePosterPath ? (
            <FastImage
              source={{uri: formatPosterPath(rating.movieBasePosterPath, 'w185')}}
              width={80}
              height={120}
              borderTopLeftRadius={topBorderRadius}
              borderBottomLeftRadius={bottomBorderRadius}
            />
          ) : (
            <Box
              width={80}
              height={120}
              backgroundColor="background"
              justifyContent="center"
              alignItems="center"
              borderTopLeftRadius={topBorderRadius}
              borderBottomLeftRadius={bottomBorderRadius}
            >
              <Icon name="noImage" color="textPrimary" size="medium" />
            </Box>
          )}
          <Box flexDirection="column" margin="small">
            <Text variant="body" fontWeight="bold">
              {rating.title}
            </Text>
            <Text variant="captionSecondary" marginTop="small">
              Rated on {ratingUpdatedAt}
            </Text>
            <Box flex={1} />
            <Text variant="caption" marginBottom="small">
              {currentRating}
            </Text>
            <RatingBar value={rating.value} size="small" disabled />
          </Box>
        </Box>
      )}
    </Pressable>
  );
};