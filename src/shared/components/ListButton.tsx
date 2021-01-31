import React from 'react';
import {Pressable} from 'react-native';
import {Box} from './Box';
import {Text} from './Text';

interface Props {
  children: string;
  destructive?: boolean;
  onPress: () => void;
}

export const ListButton = ({children, destructive, onPress}: Props) => {
  const color = destructive ? 'destructive' : 'primary';
  const colorPressed = destructive ? 'destructivePressed' : 'primaryPressed';

  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <Box
          flex={1}
          backgroundColor={pressed ? colorPressed : color}
          borderRadius="large"
          minHeight={44}
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="body" color="white">
            {children}
          </Text>
        </Box>
      )}
    </Pressable>
  );
};
