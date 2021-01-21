import React, {useLayoutEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {Box} from 'shared/components/Box';
import {Divider} from 'shared/components/Divider';
import {EmptyStateView} from 'shared/components/EmptyStateView';
import {HeaderButton} from 'shared/components/header/HeaderButton';

import {useHomeQuery} from '../hooks/useHomeQuery';
import {NotebookRowView} from '../views/NotebookRowView';
import {HomeStackParamList} from '../routes';
import {useEventBusConsumer} from 'shared/util/EventBus';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Index'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

export const HomeScreen = ({navigation}: Props) => {
  const {isLoading, isRefreshing, data: notebooks, refresh} = useHomeQuery({filter: ''});

  useEventBusConsumer({eventId: 'AddNotebook', observer: refresh});

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
        renderItem={({item}) => <NotebookRowView notebook={item} />}
        keyExtractor={({id}) => `${id}`}
        refreshControl={<RefreshControl refreshing={isLoading || isRefreshing} onRefresh={refresh} />}
        ItemSeparatorComponent={() => <Divider style="inset" />}
        ListEmptyComponent={<EmptyStateView title="No notebooks found" />}
      />
    </Box>
  );
};
