import {Notebook, Rating} from './data/local/schema';

export interface EventPayload {
  AddNotebook: Notebook;
  AddRating: Rating;
}

export type EventId = keyof EventPayload;
