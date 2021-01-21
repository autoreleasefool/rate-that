import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {Notebook} from 'shared/data/schema';
import {HomeStackParamList} from '../routes';

import {RatingSummaryView} from '../views/RatingSummaryView';

interface Props {
  notebook: Notebook;
}

export const NotebookSummaryContainer = ({notebook}: Props) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList, 'Index'>>();

  const onPress = useCallback(() => {
    navigation.navigate('NotebookDetails', {notebookId: notebook.id});
  }, [navigation, notebook.id]);

  return (
    <Box backgroundColor="cardBackground">
      <Pressable onPress={onPress}>
        <Text variant="subheader" margin="m">
          {notebook.title}
        </Text>
      </Pressable>
      <ScrollView horizontal>
        {notebook.ratings.slice(0, 10).map(rating => {
          return <RatingSummaryView key={rating.id} rating={rating} />;
        })}
      </ScrollView>
    </Box>
  );
};
