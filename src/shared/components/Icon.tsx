import React from 'react';
import {useTheme} from '@shopify/restyle';

import {Theme} from '../theme';

import Close from 'assets/icons/close.svg';
import Search from 'assets/icons/search.svg';

const iconMap = {
  close: Close,
  search: Search,
};

export type IconName = keyof typeof iconMap;

type IconSize = 'small' | 'medium' | 'large';

interface Props {
  name: IconName;
  color?: keyof Theme['colors'];
  size?: IconSize;
}

export const Icon = ({name, color = 'textPrimary', size = 'medium'}: Props) => {
  const theme = useTheme<Theme>();
  const IconComponent = iconMap[name];
  const iconColor = theme.colors[color];
  const iconSize = getIconSize(size);

  return <IconComponent width={iconSize} height={iconSize} style={{color: iconColor} as any} />;
};

function getIconSize(size: IconSize): number {
  switch (size) {
    case 'small':
      return 16;
    case 'medium':
      return 32;
    case 'large':
      return 48;
  }
}
