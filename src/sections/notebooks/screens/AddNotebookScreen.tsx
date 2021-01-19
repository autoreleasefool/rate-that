import React, {useCallback, useState} from 'react';
import {Button, TextInput} from 'react-native';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {NotebookType} from 'shared/data/schema';

import {useAddNotebook} from '../hooks/useAddNotebook';

interface AddNotebookProps {}

export const AddNotebookScreen = ({}: AddNotebookProps) => {
  const addNotebook = useAddNotebook();

  const [notebookTitle, setNotebookTitle] = useState('');

  const onSave = useCallback(() => {
    addNotebook({title: notebookTitle, type: NotebookType.MOVIES});
  }, [addNotebook, notebookTitle]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Add notebook</Text>
      <TextInput placeholder="Title" onChangeText={text => setNotebookTitle(text)} />
      <Button onPress={onSave} title="Save" />
    </Box>
  );
};
