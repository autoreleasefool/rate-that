import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/routes';
import React, {useLayoutEffect} from 'react';
import {HomeStackParamList} from 'sections/home/routes';
import {Box} from 'shared/components/Box';
import {Text} from 'shared/components/Text';
import {useNotebookDetailsQuery} from '../hooks/useNotebookDetailsQuery';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'NotebookDetails'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
  route: RouteProp<HomeStackParamList, 'NotebookDetails'>;
}

export const NotebookDetailsScreen = ({navigation, route}: Props) => {
  const {data, isLoading, isRefreshing, error, refresh} = useNotebookDetailsQuery({id: route.params.notebookId});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title ?? '',
    });
  }, [navigation, data]);

  return (
    <Box flex={1} backgroundColor="background">
      <Text>{data?.title}</Text>
    </Box>
  );
};
