import {useTheme} from '@shopify/restyle';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Theme} from 'shared/theme';

export const LoadingIndicator = () => {
  const theme = useTheme<Theme>();
  return <ActivityIndicator animating={true} color={theme.colors.secondary} size="large" />;
};
