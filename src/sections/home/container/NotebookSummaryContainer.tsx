import React, {useCallback} from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box, Text} from 'shared/components';
import {Notebook, Rating} from 'shared/data/local/schema';

import {HomeStackParamList} from '../routes';
import {RatingSummaryView} from '../views/RatingSummaryView';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Index'>,
  StackNavigationProp<RootStackParamList>
>;
interface Props {
  notebook: Notebook;
  isFirstItem: boolean;
  isLastItem: boolean;
}

const MAX_RATINGS_PREVIEW = 10;

export const NotebookSummaryContainer = ({notebook, isFirstItem, isLastItem}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  const topBorderRadius = isFirstItem ? 'large' : undefined;
  const bottomBorderRadius = isLastItem ? 'large' : undefined;

  const openNotebookDetails = useCallback(() => {
    navigation.navigate('NotebookDetails', {notebookId: notebook.id});
  }, [navigation, notebook.id]);

  const onPressRating = useCallback(
    (rating?: Rating) => {
      if (rating) {
        navigation.navigate('AddRating', {screen: 'Edit', params: {ratingId: rating.id}});
      } else {
        navigation.navigate('AddRating', {screen: 'Add', params: {notebookId: notebook.id}});
      }
    },
    [navigation, notebook],
  );

  return (
    <Pressable onPress={openNotebookDetails}>
      {({pressed}) => {
        const backgroundColor = pressed ? 'cardBackgroundPressed' : 'cardBackground';

        return (
          <Box
            backgroundColor={backgroundColor}
            marginTop={isFirstItem ? 'standard' : undefined}
            borderTopLeftRadius={topBorderRadius}
            borderTopRightRadius={topBorderRadius}
            borderBottomLeftRadius={bottomBorderRadius}
            borderBottomRightRadius={bottomBorderRadius}
          >
            <Text variant="subheader" margin="standard">
              {notebook.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <RatingSummaryView onPress={onPressRating} rating="placeholder" />
              {notebook.ratings.slice(0, MAX_RATINGS_PREVIEW).map((rating, index) => (
                <Box
                  key={rating.id}
                  marginRight={
                    index === MAX_RATINGS_PREVIEW - 1 || index === notebook.ratings.length - 1 ? 'standard' : undefined
                  }
                >
                  <RatingSummaryView key={rating.id} rating={rating} onPress={onPressRating} />
                </Box>
              ))}
            </ScrollView>
          </Box>
        );
      }}
    </Pressable>
  );
};
