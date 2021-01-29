import React, {useCallback, useState, useLayoutEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, ScrollView} from 'react-native';
import {Box, Divider, FastImage, HeaderButton, SearchBar, TextField} from 'shared/components';
import {useMovieSearch} from 'shared/data/tmdb/hooks/useMovieSearch';
import {Movie} from 'shared/data/tmdb/schema';
import {formatTitle, formatPosterPath} from 'shared/util/formatMovie';
import {useDebounce} from 'shared/util/useDebounce';

import {useAddRating} from '../hooks/useAddRating';
import {AddRatingStackParamList} from '../routes';
import {MovieResultView} from '../views/MovieResultView';

interface SearchResultsProps {
  results: Movie[];
  onResultPress: (movie: Movie) => void;
}

const SearchResults = ({results, onResultPress}: SearchResultsProps) => {
  const renderItem = useCallback(({item}) => <MovieResultView movie={item} onPress={onResultPress} />, [onResultPress]);
  const renderDivider = useCallback(() => <Divider style="inset" />, []);
  return <FlatList data={results} renderItem={renderItem} ItemSeparatorComponent={renderDivider} />;
};

interface Props {
  navigation: StackNavigationProp<AddRatingStackParamList, 'Index'>;
  route: RouteProp<AddRatingStackParamList, 'Index'>;
}

export const AddRatingScreen = ({navigation, route}: Props) => {
  const addRating = useAddRating();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce({value: query, delay: 400});
  const {results: searchResults} = useMovieSearch({query: query ? debouncedQuery : query});

  const [ratingTitle, setRatingTitle] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const [movie, setMovie] = useState<Movie>();

  const onSave = useCallback(() => {
    const title = movie ? formatTitle(movie) : ratingTitle;
    const value = ratingValue;
    const notebookId = route.params.notebookId;

    addRating({movie, title, value, notebookId});
    navigation.pop();
  }, [addRating, ratingTitle, ratingValue, navigation, route.params.notebookId, movie]);

  const onResultPress = useCallback(
    (newMovie: Movie) => {
      setMovie(newMovie);
      setQuery('');
    },
    [setMovie],
  );

  const onChangeTitle = useCallback(
    (text: string) => {
      setRatingTitle(text);
      if (movie) {
        setMovie(undefined);
      }
    },
    [movie, setMovie, setRatingTitle],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButton onPress={() => navigation.pop()} title="Cancel" />,
      headerRight: () => <HeaderButton onPress={onSave} title="Save" />,
    });
  }, [navigation, onSave]);

  const searchResultsContainer = searchResults ? (
    <SearchResults results={searchResults} onResultPress={onResultPress} />
  ) : null;

  return (
    <Box flex={1} backgroundColor="background">
      <SearchBar query={query} placeholder={'Search'} onChange={setQuery} />
      <Box flex={1}>
        <Box zIndex={1}>{searchResultsContainer}</Box>
        <ScrollView>
          <Box flex={1} zIndex={0}>
            {movie?.basePosterPath && (
              <FastImage
                source={{uri: formatPosterPath(movie.basePosterPath, 'w780')}}
                flex={1}
                height={120}
                resizeMode="cover"
              />
            )}
            <TextField
              title="Title"
              placeholder="Avengers: Endgame (2019)"
              onChangeText={onChangeTitle}
              value={movie ? movie.title : ratingTitle}
            />
            <Divider style="full" />
            <TextField
              title="Rating"
              placeholder="10"
              value={String(ratingValue)}
              onChangeText={(text: string) => setRatingValue(text ? parseInt(text, 10) : 0)}
            />
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};
