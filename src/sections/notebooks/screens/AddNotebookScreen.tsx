import React, {useCallback, useState, useLayoutEffect} from 'react';
import {TextInput, ScrollView, Switch} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Divider, HeaderButton, Text, TextField} from 'shared/components';
import {NotebookType} from 'shared/data/local/schema';

import {useAddNotebook} from '../hooks/useAddNotebook';
import {AddNotebookStackParamList} from '../routes';

type NavigationProp = StackNavigationProp<AddNotebookStackParamList, 'Index'>;

interface Props {
  navigation: NavigationProp;
}

export const AddNotebookScreen = ({navigation}: Props) => {
  const addNotebook = useAddNotebook();

  const [title, setTitle] = useState('');
  const [type, setType] = useState(NotebookType.OTHER);
  const [hasImages, setHasImages] = useState(true);

  const onSave = useCallback(() => {
    addNotebook({title, type, hasImages});
    navigation.pop();
  }, [addNotebook, title, type, hasImages, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButton onPress={() => navigation.pop()} title="Cancel" />,
      headerRight: () => <HeaderButton onPress={onSave} title="Save" />,
    });
  }, [navigation, onSave]);

  return (
    <Box flex={1} backgroundColor="background">
      <ScrollView keyboardDismissMode="on-drag">
        <Box flex={1}>
          <Box flexDirection="column" padding="standard" backgroundColor="cardBackground">
            <Text variant="body" fontWeight="bold">
              Title
            </Text>
            <TextField placeholder="Movies" onChangeText={setTitle} value={title} />
          </Box>
          <Divider style="full" />
          <Box
            flexDirection="row"
            padding="standard"
            backgroundColor="cardBackground"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="body" fontWeight="bold">
              Has images?
            </Text>
            <Switch value={hasImages} onValueChange={setHasImages} />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
