import React, {useLayoutEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box, Divider, EmptyStateView, HeaderButton} from 'shared/components';
import {useEventBusConsumer} from 'shared/util/EventBus';
import {useResetDatabase} from 'shared/data/local/hooks/useResetDatabase';

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
  const {isRefreshing, data: notebooks, refresh} = useHomeQuery({filter: ''});

  useEventBusConsumer({eventIds: ['AddNotebook', 'AddRating', 'ResetDatabase'], observer: refresh});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (__DEV__ ? <HeaderButton onPress={() => resetDb()} title="Reset" /> : null),
      headerRight: () => (
        <HeaderButton onPress={() => navigation.navigate('AddNotebook', {screen: 'Index'})} icon="plus" />
      ),
    });
  }, [navigation, resetDb]);

  return (
    <Box flex={1} backgroundColor="background" paddingHorizontal="standard">
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
        ListEmptyComponent={<EmptyStateView title="No notebooks found" />}
      />
    </Box>
  );
};
