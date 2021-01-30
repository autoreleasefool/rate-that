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
}

const MAX_RATINGS_PREVIEW = 10;

export const NotebookSummaryContainer = ({notebook}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  const openNotebookDetails = useCallback(() => {
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
    <Pressable onPress={openNotebookDetails}>
      {({pressed}) => {
        const backgroundColor = pressed ? 'cardBackgroundPressed' : 'cardBackground';

        return (
          <Box
            backgroundColor={backgroundColor}
            marginTop="standard"
            marginHorizontal="standard"
            borderWidth={StyleSheet.hairlineWidth}
            borderColor="divider"
            borderRadius="large"
            shadowColor="shadow"
            shadowRadius={2}
            shadowOpacity={0.4}
            shadowOffset={{width: 2, height: 2}}
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
