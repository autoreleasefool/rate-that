import React, {useCallback, useState, useLayoutEffect, useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {Box, Divider, FastImage, HeaderButton, SearchBar, Text, TextField} from 'shared/components';
import {useMovieSearch} from 'shared/data/tmdb/hooks/useMovieSearch';
import {Movie} from 'shared/data/tmdb/schema';
import {formatTitle} from 'shared/util/formatMovie';
import {useDebounce} from 'shared/util/useDebounce';
import {MAX_RATING_VALUE} from 'shared/constants';
import {RatingImage} from 'shared/data/local/schema';
import {formatRatingImageUrl} from 'shared/util/formatRating';

import {useSaveRating} from '../hooks/useSaveRating';
import {AddRatingStackParamList} from '../routes';
import {MovieResultView} from '../views/MovieResultView';
import {RatingBar} from '../views/RatingBar';
import {useRatingDetailsQuery} from '../hooks/useRatingDetailsQuery';

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
  navigation: StackNavigationProp<AddRatingStackParamList, 'Add' | 'Edit'>;
  route: RouteProp<AddRatingStackParamList, 'Add' | 'Edit'>;
}

export const AddRatingScreen = ({navigation, route}: Props) => {
  const saveRating = useSaveRating();
  const {data: existingRating} = useRatingDetailsQuery({
    id: 'ratingId' in route.params ? route.params.ratingId : undefined,
  });

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce({value: query, delay: 400});
  const {results: searchResults} = useMovieSearch({query: query ? debouncedQuery : query});

  const [didSetRatingProperties, setDidSetRatingProperties] = useState(false);
  const [ratingTitle, setRatingTitle] = useState('');
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingDate, setRatingDate] = useState(new Date());
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    if (existingRating && !didSetRatingProperties) {
      setDidSetRatingProperties(true);
      setRatingTitle(existingRating.title);
      setRatingValue(existingRating.value);
      setRatingDate(existingRating.updatedAt);
    }
  }, [
    existingRating,
    setRatingTitle,
    setRatingValue,
    setRatingDate,
    didSetRatingProperties,
    setDidSetRatingProperties,
  ]);

  const onSave = useCallback(() => {
    const title = movie ? formatTitle(movie) : ratingTitle;
    const value = ratingValue;
    const date = ratingDate;
    const notebookId = 'notebookId' in route.params ? route.params.notebookId : -1;
    const imageUrl: RatingImage | undefined = movie?.basePosterPath
      ? {basePosterPath: movie.basePosterPath}
      : undefined;

    if (existingRating) {
      saveRating({ratingId: existingRating.id, value, date});
    } else {
      saveRating({movieId: movie?.id, imageUrl, date, title, value, notebookId});
    }
    navigation.pop();
  }, [existingRating, saveRating, ratingTitle, ratingValue, ratingDate, navigation, route.params, movie]);

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

  const isCreatingRating = existingRating === undefined;
  const currentRating = `${ratingValue} / ${MAX_RATING_VALUE}`;
  const imageUrl = movie?.basePosterPath ? {basePosterPath: movie.basePosterPath} : undefined;

  return (
    <Box flex={1} backgroundColor="background">
      <Box visible={isCreatingRating}>
        <SearchBar query={query} placeholder={'Search'} onChange={setQuery} />
      </Box>
      <Box flex={1}>
        <Box visible={isCreatingRating} zIndex={1}>
          {searchResultsContainer}
        </Box>
        <ScrollView style={styles.scrollView}>
          <Box flex={1}>
            {imageUrl && (
              <FastImage
                source={{uri: formatRatingImageUrl(imageUrl, 'w780')}}
                flex={1}
                height={120}
                resizeMode="cover"
              />
            )}
            <Box flexDirection="column" padding="standard" backgroundColor="cardBackground">
              <Text variant="body" fontWeight="bold">
                Title
              </Text>
              <TextField
                placeholder="Avengers: Endgame (2019)"
                onChangeText={onChangeTitle}
                value={movie ? movie.title : ratingTitle}
                editable={isCreatingRating}
              />
            </Box>

            <Divider style="full" />
            <Box padding="standard" backgroundColor="cardBackground" justifyContent="center">
              <Box flexDirection="row" justifyContent="space-between" alignItems="baseline">
                <Text variant="body" fontWeight="bold">
                  Rating
                </Text>
                <Text variant="caption">{currentRating}</Text>
              </Box>
              <Box marginTop="standard">
                <RatingBar maximumRating={MAX_RATING_VALUE} value={ratingValue} onChangeRating={setRatingValue} />
              </Box>
            </Box>
            <Divider style="full" />
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    zIndex: 0,
  },
});
