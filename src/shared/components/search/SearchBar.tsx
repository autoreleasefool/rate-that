import {useTheme} from '@shopify/restyle';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Theme} from 'shared/theme';
import {Box} from '../Box';

interface Props {
  query: string;
  placeholder?: string;
  onChange: (query: string) => void;
}

export const SearchBar = ({query, placeholder, onChange}: Props) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      backgroundColor="background"
      paddingHorizontal="standard"
      paddingBottom="standard"
      borderBottomColor="divider"
      borderBottomWidth={StyleSheet.hairlineWidth}
    >
      <Box backgroundColor="cardBackground" borderRadius="large" paddingVertical="small" paddingHorizontal="standard">
        <TextInput
          value={query}
          placeholder={placeholder}
          onChangeText={onChange}
          style={{fontSize: theme.textVariants.body.fontSize, color: theme.colors.textPrimary}}
        />
      </Box>
    </Box>
  );
};
