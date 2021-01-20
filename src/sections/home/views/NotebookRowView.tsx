import React, {VoidFunctionComponent} from 'react';
import {ScrollView} from 'react-native';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {Notebook} from 'shared/data/schema';
import {RatingSummaryView} from './RatingSummaryView';

interface Props {
  notebook: Notebook;
}

export const NotebookRowView = ({notebook}: Props) => {
  return (
    <Box backgroundColor="cardBackground">
      <Text variant="subheader" margin="m">
        {notebook.title}
      </Text>
      <ScrollView horizontal>
        {notebook.ratings.slice(0, 10).map(rating => {
          return <RatingSummaryView key={rating.id} rating={rating} />;
        })}
      </ScrollView>
    </Box>
  );
};
