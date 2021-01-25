import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState, useLayoutEffect} from 'react';
import {TextInput} from 'react-native';
import {Box} from 'shared/components/Box';
import {HeaderButton} from 'shared/components/header/HeaderButton';
import {Text} from 'shared/components/Text';
import {NotebookType} from 'shared/data/local/schema';

import {useAddNotebook} from '../hooks/useAddNotebook';
import {AddNotebookStackParamList} from '../routes';

type NavigationProp = StackNavigationProp<AddNotebookStackParamList, 'Index'>;

interface Props {
  navigation: NavigationProp;
}

export const AddNotebookScreen = ({navigation}: Props) => {
  const addNotebook = useAddNotebook();

  const [notebookTitle, setNotebookTitle] = useState('');

  const onSave = useCallback(() => {
    addNotebook({title: notebookTitle, type: NotebookType.MOVIES});
    navigation.pop();
  }, [addNotebook, notebookTitle, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButton onPress={() => navigation.pop()} title="Cancel" />,
      headerRight: () => <HeaderButton onPress={onSave} title="Save" />,
    });
  }, [navigation, onSave]);

  return (
    <Box flex={1} backgroundColor="background" justifyContent="center" alignItems="center">
      <Text>Add notebook</Text>
      <TextInput placeholder="Title" onChangeText={setNotebookTitle} />
    </Box>
  );
};
