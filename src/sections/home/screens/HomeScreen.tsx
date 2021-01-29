import React, {useLayoutEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box} from 'shared/components/Box';
import {EmptyStateView} from 'shared/components/EmptyStateView';
import {HeaderButton} from 'shared/components/header/HeaderButton';
import {useEventBusConsumer} from 'shared/util/EventBus';

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
  const {isLoading, isRefreshing, data: notebooks, refresh} = useHomeQuery({filter: ''});

  useEventBusConsumer({eventIds: ['AddNotebook', 'AddRating'], observer: refresh});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton onPress={() => navigation.navigate('AddNotebook', {screen: 'Index'})} title="Add" />
      ),
    });
  }, [navigation]);

  return (
    <Box flex={1} backgroundColor="background">
      <FlatList
        data={notebooks}
        renderItem={({item}) => <NotebookSummaryContainer notebook={item} />}
        keyExtractor={({id}) => `${id}`}
        refreshControl={<RefreshControl refreshing={isLoading || isRefreshing} onRefresh={refresh} />}
        ListEmptyComponent={<EmptyStateView title="No notebooks found" />}
      />
    </Box>
  );
};
