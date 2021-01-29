import React from 'react';
import {Pressable} from 'react-native';
import {format, parse} from 'date-fns';
import {Box, FastImage, Text} from 'shared/components';
import {MovieSearchResult} from 'shared/data/tmdb/hooks/useMovieSearch';

interface Props {
  movie: MovieSearchResult;
  onPress: (id: number) => void;
}

export const MovieResultView = ({movie, onPress}: Props) => {
  const releaseDate = parse(movie.release_date, 'yyyy-MM-dd', new Date());
  const formattedDate = format(releaseDate, 'yyyy');
  const title = `${movie.title} (${formattedDate})`;
  const overview = `${movie.overview.slice(0, 120).trimEnd()}...`;

  return (
    <Pressable onPress={() => onPress(movie.id)}>
      {({pressed}) => (
        <Box
          backgroundColor={pressed ? 'cardBackgroundPressed' : 'cardBackground'}
          flexDirection="row"
          padding="standard"
        >
          {movie.poster_path && (
            <FastImage source={{uri: movie.poster_path}} width={80} height={120} resizeMode="cover" />
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
