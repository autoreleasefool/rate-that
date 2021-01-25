import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {Box} from 'shared/components/Box';
import {HeaderButton} from 'shared/components/header/HeaderButton';
import {SearchBar} from 'shared/components/search/SearchBar';
import {TextField} from 'shared/components/TextField';
import {useMovieSearch, MovieSearchResult} from 'shared/data/tmdb/hooks/useMovieSearch';
import {useDebounce} from 'shared/util/useDebounce';

import {useAddRating} from '../hooks/useAddRating';
import {AddRatingStackParamList} from '../routes';
import {MovieResultView} from '../views/MovieResultView';

interface SearchResultsProps {
  results: MovieSearchResult[];
}

const SearchResults = ({results}: SearchResultsProps) => {
  return <FlatList data={results} renderItem={({item}) => <MovieResultView movie={item} />} />;
};

interface Props {
  navigation: StackNavigationProp<AddRatingStackParamList, 'Index'>;
  route: RouteProp<AddRatingStackParamList, 'Index'>;
}

export const AddRatingScreen = ({navigation, route}: Props) => {
  const addRating = useAddRating();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce({value: query, delay: 400});
  const {results: searchResults} = useMovieSearch({query: debouncedQuery});

  const [ratingTitle, setRatingTitle] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

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

  const searchResultsContainer = searchResults ? <SearchResults results={searchResults} /> : null;

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
