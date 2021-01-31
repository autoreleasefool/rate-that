import {Notebook, Rating} from './data/local/schema';

export interface EventPayload {
  AddNotebook: Notebook;
  DeleteNotebook: undefined;
  AddRating: Rating;
  EditRating: Rating;
  ResetDatabase: undefined;
}

export type EventId = keyof EventPayload;

export const MAX_RATING_VALUE = 10;
