import React from 'react';
import {Image} from 'react-native';
import {Box, Text} from 'shared/components';
import {MovieSearchResult} from 'shared/data/tmdb/hooks/useMovieSearch';

interface Props {
  movie: MovieSearchResult;
}

export const MovieResultView = ({movie}: Props) => {
  // const image =  : null;
  // console.log(image);

  return (
    <Box flexDirection="row" padding="standard">
      {movie.poster_path && (
        <Image source={{uri: movie.poster_path}} width={80} height={120} style={{width: 80, height: 120}} />
      )}
      <Box flexDirection="column" marginHorizontal="standard">
        <Text variant="body">{movie.title}</Text>
        <Text variant="caption" marginTop="small">
          {movie.release_date}
        </Text>
      </Box>
    </Box>
  );
};
