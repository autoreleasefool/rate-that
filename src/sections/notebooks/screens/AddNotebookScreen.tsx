import React from 'react';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';

interface AddNotebookProps {}

export const AddNotebookScreen = ({}: AddNotebookProps) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Add notebook</Text>
    </Box>
  );
};
