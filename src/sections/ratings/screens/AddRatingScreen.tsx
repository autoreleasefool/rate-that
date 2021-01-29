import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {Box, Divider, HeaderButton, SearchBar, TextField} from 'shared/components';
import {useMovieSearch, MovieSearchResult} from 'shared/data/tmdb/hooks/useMovieSearch';
import {useDebounce} from 'shared/util/useDebounce';

import {useAddRating} from '../hooks/useAddRating';
import {AddRatingStackParamList} from '../routes';
import {MovieResultView} from '../views/MovieResultView';

interface SearchResultsProps {
  results: MovieSearchResult[];
  onResultPress: (id: number) => void;
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
  const [movieId, setMovieId] = useState<number>();

  const onSave = useCallback(() => {
    addRating({title: ratingTitle, value: ratingValue, notebookId: route.params.notebookId});
    navigation.pop();
  }, [addRating, ratingTitle, ratingValue, navigation, route.params.notebookId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButton onPress={() => navigation.pop()} title="Cancel" />,
      headerRight: () => <HeaderButton onPress={onSave} title="Save" />,
    });
  }, [navigation, onSave]);

  const onResultPress = useCallback(
    (id: number) => {
      setMovieId(id);
      setQuery('');
    },
    [setMovieId],
  );

  const searchResultsContainer = searchResults ? (
    <SearchResults results={searchResults} onResultPress={onResultPress} />
  ) : null;

  return (
    <Box flex={1} backgroundColor="background">
      <SearchBar query={query} placeholder={'Search'} onChange={setQuery} />
      <Box flex={1}>
        <Box zIndex={1}>{searchResultsContainer}</Box>
        <Box flex={1} zIndex={0}>
          <TextField placeholder="Title" onChangeText={setRatingTitle} value={ratingTitle} />
          <TextField
            placeholder="Rating"
            value={String(ratingValue)}
            onChangeText={(text: string) => setRatingValue(text ? parseInt(text, 10) : 0)}
          />
        </Box>
      </Box>
    </Box>
  );
};
