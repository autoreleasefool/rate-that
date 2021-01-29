import React from 'react';
import {Pressable} from 'react-native';
import {Box, FastImage, Text} from 'shared/components';
import {Movie} from 'shared/data/tmdb/schema';
import {formatOverview, formatPosterPath, formatTitle} from 'shared/util/formatMovie';

interface Props {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieResultView = ({movie, onPress}: Props) => {
  const title = formatTitle(movie);
  const overview = formatOverview(movie);

  return (
    <Pressable onPress={() => onPress(movie)}>
      {({pressed}) => (
        <Box
          backgroundColor={pressed ? 'cardBackgroundPressed' : 'cardBackground'}
          flexDirection="row"
          padding="standard"
        >
          {movie.basePosterPath && (
            <FastImage
              source={{uri: formatPosterPath(movie.basePosterPath, 'w92')}}
              width={80}
              height={120}
              resizeMode="cover"
            />
          )}
          <Box flex={1} flexDirection="column" marginHorizontal="standard">
            <Text variant="subheader">{title}</Text>
            <Text variant="body" marginTop="small">
              {overview}
            </Text>
          </Box>
        </Box>
      )}
    </Pressable>
  );
};
