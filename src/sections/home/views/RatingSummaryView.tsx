import React, {useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Box, FastImage, Text} from 'shared/components';
import {Rating} from 'shared/data/local/schema';
import {formatRatingImageUrl} from 'shared/data/local/util/ratingUtil';

export type RatingProps = Pick<Rating, 'id' | 'imageUrl' | 'title' | 'value'>;
interface PlaceholderProps {
  placeholder: true;
}

type Props = (PlaceholderProps | RatingProps) & {
  supportsImages: boolean;
  onPress: (ratingId?: number) => void;
};

export const RatingSummaryView = (props: Props) => {
  const commonOnPress = useCallback(() => {
    if (isPlaceholderProps(props)) {
      props.onPress();
    } else {
      props.onPress(props.id);
    }
  }, [props]);

  return props.supportsImages ? (
    <RatingSummaryWithImage {...props} onPress={commonOnPress} />
  ) : (
    <RatingSummaryWithoutImage {...props} onPress={commonOnPress} />
  );
};

type InnerProps = (PlaceholderProps | RatingProps) & {
  onPress: () => void;
};

const RatingSummaryWithImage = (props: InnerProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {({pressed}) => (
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
          {!isPlaceholderProps(props) && props.imageUrl && (
            <Box style={StyleSheet.absoluteFill}>
              <FastImage
                borderRadius="large"
                source={{uri: formatRatingImageUrl(props.imageUrl, 'w154')}}
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
          {isPlaceholderProps(props) ? (
            <Text variant="header" color="white">
              +
            </Text>
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
                {props.value}
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Pressable>
  );
};

const RatingSummaryWithoutImage = (props: InnerProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {({pressed}) => (
        <Box
          maxWidth={160}
          marginLeft="standard"
          marginBottom="standard"
          alignItems="center"
          justifyContent="center"
          borderRadius="large"
          shadowColor="shadow"
          shadowRadius={2}
          shadowOpacity={0.4}
          shadowOffset={{width: 2, height: 2}}
          backgroundColor={pressed ? 'primaryPressed' : 'primary'}
        >
          {isPlaceholderProps(props) ? (
            <Text variant="header" color="white" padding="standard">
              +
            </Text>
          ) : (
            <Box>
              <Text variant="body" color="white" padding="standard" numberOfLines={2} ellipsizeMode="tail">
                {props.title}
              </Text>
              <Box
                backgroundColor="blackTransparent"
                position="absolute"
                right={0}
                bottom={0}
                borderTopLeftRadius="large"
                borderBottomRightRadius="large"
                overflow="hidden"
              >
                <Text variant="subheader" color="white" paddingHorizontal="small" paddingVertical="extraSmall">
                  {props.value}
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Pressable>
  );
};

function isPlaceholderProps(props: PlaceholderProps | RatingProps): props is PlaceholderProps {
  return 'placeholder' in props;
}
