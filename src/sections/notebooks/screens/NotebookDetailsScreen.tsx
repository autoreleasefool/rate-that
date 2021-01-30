import React, {useLayoutEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {HomeStackParamList} from 'sections/home/routes';
import {Box, Divider, EmptyStateView} from 'shared/components';

import {useNotebookDetailsQuery} from '../hooks/useNotebookDetailsQuery';
import {RatingRowView} from '../views/RatingRowView';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'NotebookDetails'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
  route: RouteProp<HomeStackParamList, 'NotebookDetails'>;
}

export const NotebookDetailsScreen = ({navigation, route}: Props) => {
  const {data, isLoading, isRefreshing, error, refresh} = useNotebookDetailsQuery({id: route.params.notebookId});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title ?? '',
    });
  }, [navigation, data]);

  return (
    <Box flex={1} backgroundColor="background" paddingHorizontal="standard">
      <FlatList
        data={data?.ratings ?? []}
        refreshControl={<RefreshControl refreshing={isLoading || isRefreshing} onRefresh={refresh} />}
        renderItem={({item, index}) => (
          <RatingRowView rating={item} isFirstItem={index === 0} isLastItem={index + 1 === data?.ratings.length} />
        )}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyStateView title="No ratings" />}
      />
    </Box>
  );
};
