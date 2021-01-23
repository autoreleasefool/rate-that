import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState, useLayoutEffect} from 'react';
import {TextInput} from 'react-native';
import {Box} from 'shared/components/Box';
import {HeaderButton} from 'shared/components/header/HeaderButton';
import {SearchBar} from 'shared/components/search/SearchBar';
import {Text} from 'shared/components/Text';

import {useAddRating} from '../hooks/useAddRating';
import {AddRatingStackParamList} from '../routes';

interface Props {
  navigation: StackNavigationProp<AddRatingStackParamList, 'Index'>;
  route: RouteProp<AddRatingStackParamList, 'Index'>;
}

export const AddRatingScreen = ({navigation, route}: Props) => {
  const addRating = useAddRating();

  const [query, setQuery] = useState('');

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

  return (
    <Box flex={1} backgroundColor="background">
      <SearchBar query={query} placeholder={'Search'} onChange={setQuery} />
      <Box flex={1}>
        <TextInput placeholder="Title" onChangeText={setRatingTitle} />
      </Box>
    </Box>
  );
};
