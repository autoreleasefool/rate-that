import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box} from 'shared/components/Box';
import {EmptyStateView} from 'shared/components/EmptyStateView';
import {Divider} from 'shared/components/Divider';

import {useHomeQuery} from '../hooks/useHomeQuery';
import {NotebookRowView} from '../views/NotebookRowView';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({}: Props) => {
  const {isLoading, data: notebooks} = useHomeQuery({filter: ''});

  return (
    <Box flex={1}>
      <FlatList
        data={notebooks}
        renderItem={({item}) => <NotebookRowView notebook={item} />}
        refreshControl={<RefreshControl refreshing={isLoading} />}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyStateView title="No notebooks found" />}
      />
    </Box>
  );
};
