import React from 'react';
import {useTheme} from '@shopify/restyle';

import {Theme} from '../theme';

import Close from 'assets/icons/close.svg';
import NoImage from 'assets/icons/no-image.svg';
import Search from 'assets/icons/search.svg';
import Star from 'assets/icons/star.svg';

const iconMap = {
  close: Close,
  noImage: NoImage,
  search: Search,
  star: Star,
};

export type IconName = keyof typeof iconMap;

type IconSize = 'small' | 'medium' | 'large';

interface Props {
  name: IconName;
  color?: keyof Theme['colors'];
  fill?: keyof Theme['colors'];
  size?: IconSize;
}

export const Icon = ({name, color = 'textPrimary', fill, size = 'medium'}: Props) => {
  const theme = useTheme<Theme>();
  const IconComponent = iconMap[name];
  const iconColor = theme.colors[color];
  const iconFill = fill ? theme.colors[fill] : undefined;
  const iconSize = getIconSize(size);

  return <IconComponent width={iconSize} height={iconSize} fill={iconFill} stroke={iconColor} />;
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
