import React, {useCallback, useState, useLayoutEffect, useEffect} from 'react';
import {FlatList} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Divider, FastImage, Form, FormElement, HeaderButton, SearchBar, TextField} from 'shared/components';
import {useMovieSearch} from 'shared/data/tmdb/hooks/useMovieSearch';
import {Movie} from 'shared/data/tmdb/schema';
import {formatTitle} from 'shared/data/tmdb/util/movieUtil';
import {useDebounce} from 'shared/util/useDebounce';
import {MAX_RATING_VALUE} from 'shared/constants';
import {NotebookType, RatingImage} from 'shared/data/local/schema';
import {formatRatingImageUrl} from 'shared/data/local/util/ratingUtil';

import {useSaveRating} from '../hooks/useSaveRating';
import {AddRatingStackParamList} from '../routes';
import {MovieResultView} from '../views/MovieResultView';
import {RatingBar} from '../views/RatingBar';
import {useAddRatingDetailsQuery} from '../hooks/useAddRatingDetailsQuery';

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
  const {data} = useAddRatingDetailsQuery({
    ratingId: 'ratingId' in route.params ? route.params.ratingId : undefined,
    notebookId: 'notebookId' in route.params ? route.params.notebookId : undefined,
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
    if (data?.rating && !didSetRatingProperties) {
      setDidSetRatingProperties(true);
      setRatingTitle(data.rating.title);
      setRatingValue(data.rating.value);
      setRatingDate(data.rating.updatedAt);
    }
  }, [data?.rating, setRatingTitle, setRatingValue, setRatingDate, didSetRatingProperties, setDidSetRatingProperties]);

  const onSave = useCallback(() => {
    const title = movie ? formatTitle(movie) : ratingTitle;
    const value = ratingValue;
    const date = ratingDate;
    const notebookId = 'notebookId' in route.params ? route.params.notebookId : -1;
    const imageUrl: RatingImage | undefined = movie?.basePosterPath
      ? {basePosterPath: movie.basePosterPath}
      : undefined;

    if (data?.rating) {
      saveRating({ratingId: data.rating.id, value, date});
    } else {
      saveRating({movieId: movie?.id, imageUrl, date, title, value, notebookId});
    }
    navigation.pop();
  }, [data?.rating, saveRating, ratingTitle, ratingValue, ratingDate, navigation, route.params, movie]);

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
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton onPress={onSave} title="Save" disabled={ratingTitle.length === 0} />,
    });
  });

  const isCreatingRating = !('ratingId' in route.params);
  const showMovieSearch = data?.notebook.type === NotebookType.MOVIES;
  const imageUrl = movie?.basePosterPath ? {basePosterPath: movie.basePosterPath} : undefined;

  return (
    <Box flex={1} backgroundColor="background">
      <Box visible={isCreatingRating && showMovieSearch}>
        <SearchBar query={query} placeholder={'Search'} onChange={setQuery} />
      </Box>
      <Box flex={1}>
        <Box visible={isCreatingRating} zIndex={1}>
          {searchResults && <SearchResults results={searchResults} onResultPress={onResultPress} />}
        </Box>
        <Box zIndex={0}>
          <Form>
            {imageUrl && (
              <FastImage
                source={{uri: formatRatingImageUrl(imageUrl, 'w780')}}
                flex={1}
                height={120}
                resizeMode="cover"
              />
            )}
            <FormElement title="Title">
              <TextField
                placeholder="Avengers: Endgame (2019)"
                onChangeText={onChangeTitle}
                value={movie ? movie.title : ratingTitle}
                editable={isCreatingRating}
              />
            </FormElement>
            <FormElement title="Rating">
              <RatingBar maximumRating={MAX_RATING_VALUE} value={ratingValue} onChangeRating={setRatingValue} />
            </FormElement>
            <FormElement>
              <DateTimePicker
                value={ratingDate}
                mode="date"
                display="inline"
                onChange={(_, date) => setRatingDate(date ?? ratingDate)}
              />
            </FormElement>
          </Form>
        </Box>
      </Box>
    </Box>
  );
};
