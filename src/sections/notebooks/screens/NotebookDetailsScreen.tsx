import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl} from 'react-native';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {HomeStackParamList} from 'sections/home/routes';
import {Box, Divider, EmptyStateView, HeaderButton, SearchBar, Text} from 'shared/components';
import {useEventBusConsumer} from 'shared/util/EventBus';
import {useDebounce} from 'shared/util/useDebounce';
import {ListButton} from 'shared/components/ListButton';

import {useNotebookDetailsQuery} from '../hooks/useNotebookDetailsQuery';
import {RatingSummaryContainer} from '../container/RatingSummaryContainer';
import {useDeleteNotebook} from '../hooks/useDeleteNotebook';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'NotebookDetails'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
  route: RouteProp<HomeStackParamList, 'NotebookDetails'>;
}

export const NotebookDetailsScreen = ({navigation, route}: Props) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce({value: query, delay: 400});

  const {data, isRefreshing, refresh} = useNotebookDetailsQuery({id: route.params.notebookId, filter: debouncedQuery});

  useEventBusConsumer({eventIds: ['AddRating', 'EditRating'], observer: refresh});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title ?? '',
      headerRight: () => (
        <HeaderButton
          icon="plus"
          onPress={() => navigation.navigate('AddRating', {screen: 'Add', params: {notebookId: data?.id ?? -1}})}
        />
      ),
    });
  }, [navigation, data]);

  const deleteNotebook = useDeleteNotebook();
  const onDelete = useCallback(() => {
    Alert.alert(`Delete ${data?.title}?`, 'Are you sure you want to delete this notebook and all of its ratings?', [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteNotebook(route.params.notebookId);
          navigation.pop();
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  }, [navigation, deleteNotebook, route.params.notebookId, data?.title]);

  return (
    <Box flex={1} backgroundColor="background">
      <SearchBar query={query} placeholder={'Search'} onChange={setQuery} />
      <Box paddingHorizontal="standard" flex={1}>
        <FlatList
          data={data?.ratings ?? []}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
          renderItem={({item, index}) => (
            <RatingSummaryContainer
              rating={item}
              isFirstItem={index === 0}
              isLastItem={index + 1 === data?.ratings.length}
            />
          )}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={
            <EmptyStateView
              title={debouncedQuery.length === 0 ? 'No ratings' : `No ratings for "${debouncedQuery}"`}
              subtitle={debouncedQuery.length === 0 ? undefined : 'Try another search, or clear the current search'}
            />
          }
          ListHeaderComponent={<ListHeader totalRatings={24} averageRating={1.4} />}
          ListFooterComponent={<ListFooter onDelete={onDelete} />}
        />
      </Box>
    </Box>
  );
};

interface ListHeaderProps {
  totalRatings: number;
  averageRating: number;
}

const ListHeader = ({totalRatings, averageRating}: ListHeaderProps) => {
  return (
    <Box backgroundColor="cardBackground" borderRadius="large" marginTop="standard">
      <Box paddingVertical="small" paddingHorizontal="standard" flexDirection="row" justifyContent="space-between">
        <Text variant="body" fontWeight="bold">
          Total ratings
        </Text>
        <Text variant="body">24</Text>
      </Box>
      <Divider />
      <Box paddingVertical="small" paddingHorizontal="standard" flexDirection="row" justifyContent="space-between">
        <Text variant="body" fontWeight="bold">
          Average rating
        </Text>
        <Text variant="body">7.2</Text>
      </Box>
    </Box>
  );
};

interface ListFooterProps {
  onDelete: () => void;
}

const ListFooter = ({onDelete}: ListFooterProps) => {
  return (
    <Box marginVertical="standard">
      <ListButton onPress={onDelete} destructive>
        Delete notebook
      </ListButton>
    </Box>
  );
};
