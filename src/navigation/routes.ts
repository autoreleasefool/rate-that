import {NavigatorScreenParams} from '@react-navigation/native';
import {HomeStackParamList} from 'sections/home/routes';
import {AddNotebookStackParamList} from 'sections/notebooks/routes';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  AddNotebook: NavigatorScreenParams<AddNotebookStackParamList>;
};
