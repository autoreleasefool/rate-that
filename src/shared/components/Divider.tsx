import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from 'shared/theme';

import {Box} from './Box';

type DividerStyle = 'inset' | 'full';
interface DividerProps {
  style?: DividerStyle;
  vertical?: boolean;
}

export const Divider = ({vertical, style = 'full'}: DividerProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      flex={1}
      left={style === 'full' ? undefined : theme.spacing.standard}
      height={vertical ? undefined : StyleSheet.hairlineWidth}
      width={vertical ? StyleSheet.hairlineWidth : undefined}
      backgroundColor="divider"
      opacity={0.5}
    />
  );
};
