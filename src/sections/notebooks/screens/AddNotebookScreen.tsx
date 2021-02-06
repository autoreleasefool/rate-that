import React, {useCallback, useState, useLayoutEffect} from 'react';
import {Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Form, FormElement, HeaderButton, TextField} from 'shared/components';
import {NotebookType} from 'shared/data/local/schema';
import {formatType} from 'shared/data/local/util/notebookUtil';

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
      <Form>
        <FormElement title="Title">
          <TextField placeholder="Movies" onChangeText={setTitle} value={title} />
        </FormElement>
        <FormElement
          title="Category"
          caption="Describes what the notebook will contain. Certain categories offer search functionality"
        >
          <Picker onValueChange={setType as (arg0: React.ReactText) => void} selectedValue={type}>
            {Object.keys(NotebookType)
              .filter(key => isNaN(Number(key)))
              .map(notebookType => (
                <Picker.Item key={notebookType} label={formatType(notebookType)} value={notebookType} />
              ))}
          </Picker>
        </FormElement>
        <FormElement title="Include images?" inline>
          <Switch value={hasImages} onValueChange={setHasImages} />
        </FormElement>
      </Form>
    </Box>
  );
};
