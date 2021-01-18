import {Notebook} from './data/schema';

export interface EventPayload {
  AddNotebook: Notebook;
}

export type EventId = keyof EventPayload;
