import React, {useCallback} from 'react';
import {Button, Pressable, ScrollView} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box, IconButton, Text} from 'shared/components';
import {Notebook} from 'shared/data/local/schema';

import {HomeStackParamList} from '../routes';
import {RatingSummaryView, RatingProps} from '../views/RatingSummaryView';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Index'>,
  StackNavigationProp<RootStackParamList>
>;
interface Props {
  notebook: Pick<Notebook, 'id' | 'hasImages' | 'title' | 'type'> & {
    ratings: RatingProps[];
  };
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
    (ratingId?: number) => {
      if (ratingId !== undefined && ratingId !== null) {
        navigation.navigate('AddRating', {screen: 'Edit', params: {ratingId: ratingId}});
      } else {
        navigation.navigate('AddRating', {screen: 'Add', params: {notebookId: notebook.id}});
      }
    },
    [navigation, notebook],
  );

  const hasRatings = notebook.ratings.length > 0;

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
            <Box flexDirection="row" justifyContent="space-between" alignItems="center" margin="standard">
              <Text variant="subheader" marginRight="standard">
                {notebook.title}
              </Text>
              <Pressable onPress={() => onPressRating()}>
                {({pressed: addRatingPressed}) => (
                  <Text color={addRatingPressed ? 'textSecondary' : 'textPrimary'} variant="caption">
                    Add rating
                  </Text>
                )}
              </Pressable>
            </Box>

            {hasRatings ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {notebook.ratings.slice(0, MAX_RATINGS_PREVIEW).map((rating, index) => (
                  <Box
                    key={rating.id}
                    marginRight={
                      index === MAX_RATINGS_PREVIEW - 1 || index === notebook.ratings.length - 1
                        ? 'standard'
                        : undefined
                    }
                  >
                    <RatingSummaryView
                      key={rating.id}
                      id={rating.id}
                      value={rating.value}
                      title={rating.title}
                      imageUrl={rating.imageUrl}
                      onPress={onPressRating}
                      supportsImages={notebook.hasImages}
                    />
                  </Box>
                ))}
              </ScrollView>
            ) : (
              <Text variant="body" paddingHorizontal="standard" paddingBottom="standard">
                No ratings added
              </Text>
            )}
          </Box>
        );
      }}
    </Pressable>
  );
};
