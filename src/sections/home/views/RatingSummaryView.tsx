import React, {useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Box, FastImage, Text} from 'shared/components';
import {Rating} from 'shared/data/local/schema';
import {formatRatingImageUrl} from 'shared/util/formatRating';

interface Props {
  rating: Rating | 'placeholder';
  onPress: (rating?: Rating) => void;
}

export const RatingSummaryView = ({rating, onPress}: Props) => {
  const commonOnPress = useCallback(() => {
    if (rating === 'placeholder') {
      onPress();
    } else {
      onPress(rating);
    }
  }, [rating, onPress]);

  return (
    <Pressable onPress={commonOnPress}>
      {({pressed}) => {
        return (
          <Box
            width={80}
            height={120}
            borderRadius="large"
            shadowColor="shadow"
            shadowRadius={2}
            shadowOpacity={0.4}
            shadowOffset={{width: 2, height: 2}}
            backgroundColor={pressed ? 'primaryPressed' : 'primary'}
            marginLeft="standard"
            marginBottom="standard"
            alignItems="center"
            justifyContent="center"
          >
            {rating !== 'placeholder' && rating.imageUrl && (
              <Box style={StyleSheet.absoluteFill}>
                <FastImage
                  borderRadius="large"
                  source={{uri: formatRatingImageUrl(rating.imageUrl, 'w92')}}
                  resizeMode="cover"
                  style={StyleSheet.absoluteFill}
                />
                <Box
                  style={StyleSheet.absoluteFill}
                  backgroundColor="overlay"
                  opacity={pressed ? 0.4 : 0}
                  borderRadius="large"
                />
              </Box>
            )}
            {rating === 'placeholder' ? (
              <Text variant="header">+</Text>
            ) : (
              <Box
                backgroundColor="blackTransparent"
                position="absolute"
                right={0}
                bottom={0}
                borderTopLeftRadius="large"
                borderBottomRightRadius="large"
                overflow="hidden"
              >
                <Text variant="header" color="white" paddingHorizontal="small" paddingVertical="extraSmall">
                  {rating.value}
                </Text>
              </Box>
            )}
          </Box>
        );
      }}
    </Pressable>
  );
};
