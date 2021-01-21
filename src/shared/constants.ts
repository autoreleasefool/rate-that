import {Notebook, Rating} from './data/schema';

export interface EventPayload {
  AddNotebook: Notebook;
  AddRating: Rating;
}

export type EventId = keyof EventPayload;
