import React, {useCallback, useRef} from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useTheme} from '@shopify/restyle';
import {Theme} from 'shared/theme';
import {Box} from '../Box';
import {Icon} from '../Icon';
import {IconButton} from '../IconButton';

interface Props {
  query: string;
  placeholder?: string;
  onChange: (query: string) => void;
}

export const SearchBar = ({query, placeholder, onChange}: Props) => {
  const theme = useTheme<Theme>();
  const textInput = useRef<TextInput>(null);

  const animatedOpacity = useSharedValue(0);
  const animatedWidth = useSharedValue(0);
  const animatedCloseStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedOpacity.value, {
        duration: 200,
      }),
      width: withTiming(animatedWidth.value, {
        duration: 200,
      }),
    };
  });

  const onFocus = useCallback(() => {
    animatedOpacity.value = 1;
    animatedWidth.value = theme.spacing.standard + theme.spacing.small;
  }, [animatedOpacity, animatedWidth, theme.spacing.standard, theme.spacing.small]);

  const onBlur = useCallback(
    (forceAnimation?: boolean) => {
      if (!query || forceAnimation) {
        animatedOpacity.value = 0;
        animatedWidth.value = 0;
      }
    },
    [query, animatedOpacity, animatedWidth],
  );

  const focusInput = useCallback(() => {
    textInput.current?.focus();
  }, [textInput]);

  const blurInput = useCallback(() => {
    onChange('');
    textInput.current?.blur();
    onBlur(true);
  }, [textInput, onChange, onBlur]);

  return (
    <Pressable onPress={focusInput}>
      <Box
        flexDirection="row"
        backgroundColor="background"
        padding="standard"
        borderBottomColor="divider"
        borderBottomWidth={StyleSheet.hairlineWidth}
        alignItems="center"
      >
        <Box
          flex={1}
          backgroundColor="cardBackground"
          flexDirection="row"
          borderRadius="large"
          paddingVertical="small"
          paddingHorizontal="standard"
          alignItems="center"
        >
          <Box marginRight="small">
            <Icon name="search" size="small" />
          </Box>

          <TextInput
            ref={textInput}
            value={query}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={() => onBlur()}
            onFocus={onFocus}
            style={{fontSize: theme.textVariants.body.fontSize, color: theme.colors.textPrimary}}
          />
        </Box>
        <Animated.View style={animatedCloseStyle}>
          <IconButton
            onPress={blurInput}
            disabled={!textInput.current?.isFocused}
            color="textPrimary"
            colorPressed="textSecondary"
            name="close"
            size="small"
          />
        </Animated.View>
        {/* </Box> */}
      </Box>
    </Pressable>
  );
};
