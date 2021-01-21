import {NavigatorScreenParams} from '@react-navigation/native';
import {HomeStackParamList} from 'sections/home/routes';
import {AddNotebookStackParamList} from 'sections/notebooks/routes';
import {AddRatingStackParamList} from 'sections/ratings/routes';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  AddNotebook: NavigatorScreenParams<AddNotebookStackParamList>;
  AddRating: NavigatorScreenParams<AddRatingStackParamList>;
};
