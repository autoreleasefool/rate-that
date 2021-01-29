import React from 'react';
import {createBox} from '@shopify/restyle';
import NativeFastImage from 'react-native-fast-image';
import {Theme} from 'shared/theme';

export const FastImage = createBox<Theme, React.ComponentProps<typeof NativeFastImage>>(NativeFastImage);
