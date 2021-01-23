import React from 'react';
import {StyleSheet} from 'react-native';

import {Box} from './Box';

type DividerStyle = 'inset' | 'full';
interface DividerProps {
  style?: DividerStyle;
  vertical?: boolean;
}

export const Divider = ({vertical, style}: DividerProps) => {
  return (
    <Box
      flex={1}
      paddingLeft={style === 'full' ? undefined : 'standard'}
      height={vertical ? undefined : StyleSheet.hairlineWidth}
      width={vertical ? StyleSheet.hairlineWidth : undefined}
    />
  );
};
