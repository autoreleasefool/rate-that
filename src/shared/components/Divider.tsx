import React from 'react';
import {StyleSheet} from 'react-native';
import {Box} from './Box';

interface DividerProps {
  vertical?: boolean;
}

export const Divider = ({vertical}: DividerProps) => {
  return (
    <Box
      flex={1}
      height={vertical ? undefined : StyleSheet.hairlineWidth}
      width={vertical ? StyleSheet.hairlineWidth : undefined}
    />
  );
};
