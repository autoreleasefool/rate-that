import React, {useCallback} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import {HomeStackParamList} from 'sections/home/routes';
import {Rating} from 'shared/data/local/schema';
import {RatingRowView} from '../views/RatingRowView';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'NotebookDetails'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  rating: Rating;
  isFirstItem: boolean;
  isLastItem: boolean;
}

export const RatingSummaryContainer = ({rating, isFirstItem, isLastItem}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  const onPress = useCallback(() => {
    navigation.navigate('AddRating', {screen: 'Edit', params: {ratingId: rating.id}});
  }, [navigation, rating.id]);

  return <RatingRowView onPress={onPress} isFirstItem={isFirstItem} isLastItem={isLastItem} rating={rating} />;
};
