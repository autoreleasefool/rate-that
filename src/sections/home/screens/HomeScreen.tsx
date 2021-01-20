import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Button, FlatList, Modal, RefreshControl} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {AddNotebookScreen} from 'sections/notebooks/screens/AddNotebookScreen';
import {Box} from 'shared/components/Box';
import {Divider} from 'shared/components/Divider';
import {EmptyStateView} from 'shared/components/EmptyStateView';
import {useEventBusConsumer} from 'shared/util/EventBus';

import {useHomeQuery} from '../hooks/useHomeQuery';
import {NotebookRowView} from '../views/NotebookRowView';
import {HeaderButton} from 'shared/components/header/HeaderButton';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const [showAddNotebook, setShowAddNotebook] = useState(false);

  const {isLoading, isRefreshing, data: notebooks, refresh} = useHomeQuery({filter: ''});

  const showNotebookModal = useCallback(() => setShowAddNotebook(true), [setShowAddNotebook]);
  const hideNotebookModal = useCallback(() => setShowAddNotebook(false), [setShowAddNotebook]);

  useEventBusConsumer({
    eventId: 'AddNotebook',
    observer: useCallback(() => {
      setShowAddNotebook(false);
      refresh();
    }, [setShowAddNotebook, refresh]),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton onPress={showNotebookModal} title="Add" />,
    });
  }, [navigation, showNotebookModal]);

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
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={showAddNotebook}
        onRequestClose={hideNotebookModal}
      >
        <AddNotebookScreen />
      </Modal>
    </Box>
  );
};
