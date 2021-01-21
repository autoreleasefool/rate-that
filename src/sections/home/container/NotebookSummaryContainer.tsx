import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import React, {useCallback} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {Notebook, Rating} from 'shared/data/schema';
import {HomeStackParamList} from '../routes';

import {RatingSummaryView} from '../views/RatingSummaryView';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Index'>,
  StackNavigationProp<RootStackParamList>
>;
interface Props {
  notebook: Notebook;
}

export const NotebookSummaryContainer = ({notebook}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  const onPress = useCallback(() => {
    navigation.navigate('NotebookDetails', {notebookId: notebook.id});
  }, [navigation, notebook.id]);

  const onPressRating = useCallback(
    (rating?: Rating) => {
      if (!rating) {
        navigation.navigate('AddRating', {screen: 'Index', params: {notebookId: notebook.id}});
      }
    },
    [navigation, notebook],
  );

  return (
    <Box backgroundColor="cardBackground">
      <Pressable onPress={onPress}>
        <Text variant="subheader" margin="m">
          {notebook.title}
        </Text>
      </Pressable>
      <ScrollView horizontal>
        <RatingSummaryView onPress={onPressRating} rating="placeholder" />
        {notebook.ratings.slice(0, 10).map(rating => {
          return <RatingSummaryView key={rating.id} rating={rating} onPress={onPressRating} />;
        })}
      </ScrollView>
    </Box>
  );
};