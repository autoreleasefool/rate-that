import React, {useCallback, useLayoutEffect} from 'react';
import {Alert, FlatList, RefreshControl} from 'react-native';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {HomeStackParamList} from 'sections/home/routes';
import {Box, Divider, EmptyStateView, HeaderButton} from 'shared/components';
import {useEventBusConsumer} from 'shared/util/EventBus';

import {useNotebookDetailsQuery} from '../hooks/useNotebookDetailsQuery';
import {RatingSummaryContainer} from '../container/RatingSummaryContainer';
import {ListButton} from 'shared/components/ListButton';
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
  const {data, isRefreshing, refresh} = useNotebookDetailsQuery({id: route.params.notebookId});

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
    <Box flex={1} backgroundColor="background" paddingHorizontal="standard">
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
        ListEmptyComponent={<EmptyStateView title="No ratings" />}
        ListFooterComponent={
          <Box marginTop="standard">
            <ListButton onPress={onDelete} destructive>
              Delete notebook
            </ListButton>
          </Box>
        }
      />
    </Box>
  );
};
