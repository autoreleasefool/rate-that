import React, {useLayoutEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box, Divider, EmptyStateView, HeaderButton, LoadingIndicator, SearchBar} from 'shared/components';
import {useEventBusConsumer} from 'shared/util/EventBus';
import {useResetDatabase} from 'shared/data/local/hooks/useResetDatabase';
import {useDebounce} from 'shared/util/useDebounce';

import {useHomeQuery} from '../hooks/useHomeQuery';
import {HomeStackParamList} from '../routes';
import {NotebookSummaryContainer} from '../container/NotebookSummaryContainer';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Index'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

export const HomeScreen = ({navigation}: Props) => {
  const resetDb = useResetDatabase();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce({value: query, delay: 400});

  const {isRefreshing, isLoading, data: notebooks, refresh} = useHomeQuery({filter: debouncedQuery});

  useEventBusConsumer({
    eventIds: ['AddNotebook', 'DeleteNotebook', 'AddRating', 'EditRating', 'ResetDatabase'],
    observer: refresh,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (__DEV__ ? <HeaderButton onPress={() => resetDb()} title="Reset" /> : null),
      headerRight: () => (
        <HeaderButton onPress={() => navigation.navigate('AddNotebook', {screen: 'Index'})} icon="plus" />
      ),
    });
  }, [navigation, resetDb]);

  if (isLoading) {
    return (
      <Box flex={1}>
        <LoadingIndicator />
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="background">
      <SearchBar query={query} placeholder={'Search'} onChange={setQuery} />
      <Box paddingHorizontal="standard" flex={1}>
        <FlatList
          data={notebooks}
          renderItem={({item, index}) => (
            <NotebookSummaryContainer
              notebook={item}
              isFirstItem={index === 0}
              isLastItem={index + 1 === notebooks?.length}
            />
          )}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={
            <EmptyStateView
              title={debouncedQuery.length === 0 ? 'No notebooks found' : `No notebooks for "${debouncedQuery}"`}
              subtitle={debouncedQuery.length === 0 ? undefined : 'Try another search, or clear the current search'}
            />
          }
        />
      </Box>
    </Box>
  );
};
