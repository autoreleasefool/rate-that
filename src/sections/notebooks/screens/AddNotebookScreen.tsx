import React, {useCallback, useState, useLayoutEffect} from 'react';
import {TextInput, ScrollView, Switch} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Divider, HeaderButton, Text, TextField} from 'shared/components';
import {NotebookType} from 'shared/data/local/schema';

import {useAddNotebook} from '../hooks/useAddNotebook';
import {AddNotebookStackParamList} from '../routes';
import {Picker} from '@react-native-picker/picker';
import {formatType} from 'shared/util/formatNotebook';

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
          <Box padding="standard" backgroundColor="cardBackground">
            <Text variant="body" fontWeight="bold">
              Title
            </Text>
            <TextField placeholder="Movies" onChangeText={setTitle} value={title} />
          </Box>
          <Divider style="full" />
          <Box backgroundColor="cardBackground">
            <Text variant="body" fontWeight="bold" padding="standard">
              Category
            </Text>
            <Text variant="caption" paddingHorizontal="standard">
              Describes what the notebook will contain. Certain categories offer search functionality
            </Text>
            <Picker onValueChange={setType as (arg0: React.ReactText) => void} selectedValue={type}>
              {Object.keys(NotebookType)
                .filter(key => isNaN(Number(key)))
                .map(notebookType => (
                  <Picker.Item key={notebookType} label={formatType(notebookType)} value={notebookType} />
                ))}
            </Picker>
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
