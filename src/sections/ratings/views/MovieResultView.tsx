import React from 'react';
import {Image} from 'react-native';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {MovieSearchResult} from 'shared/data/tmdb/hooks/useMovieSearch';

interface Props {
  movie: MovieSearchResult;
}

export const MovieResultView = ({movie}: Props) => {
  const image = movie.poster_path ? <Image source={{uri: movie.poster_path}} width={80} height={120} /> : null;

  return (
    <Box flexDirection="row" padding="standard">
      {image}
      <Box flexDirection="column" marginHorizontal="standard">
        <Text variant="body">{movie.title}</Text>
        <Text variant="caption" marginTop="small">
          {movie.release_date}
        </Text>
      </Box>
    </Box>
  );
};
