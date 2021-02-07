import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import {v4 as uuidV4} from 'uuid';
import {EventPayload, EventId} from 'shared/constants';

type EventBusObserver<T extends EventId> = (payload: EventPayload[T]) => void;

class EventBus {
  observers: Map<EventId, Map<string, any>> = new Map();

  addObserver = <T extends EventId>(eventId: EventId, observerId: string, observer: EventBusObserver<T>) => {
    if (!this.observers.has(eventId)) {
      this.observers.set(eventId, new Map());
    }
    this.observers.get(eventId)?.set(observerId, observer);
  };

  removeObserver = (eventId: EventId, observerId: string) => {
    if (!this.observers.has(eventId)) {
      return;
    }
    this.observers.get(eventId)?.delete(observerId);
  };

  getObservers = <T extends EventId>(eventId: EventId): EventBusObserver<T>[] => {
    return Array.from(this.observers.get(eventId)?.values() ?? []) as EventBusObserver<T>[];
  };
}

const globalEventBus = new EventBus();

export const EventBusContext = React.createContext(globalEventBus);

export const EventBusContainer = ({children}: {children: React.ReactElement}) => {
  return <EventBusContext.Provider value={globalEventBus}>{children}</EventBusContext.Provider>;
};

// MARK: Provider

type ProducerProps<T extends EventId> = {eventId: T};

export const useEventBusProducer = <T extends EventId>({eventId}: ProducerProps<T>) => {
  const eventBus = useContext(EventBusContext);
  return useCallback(
    (payload: EventPayload[T]) => {
      eventBus.getObservers(eventId).forEach(observer => {
        observer(payload);
      });
    },
    [eventBus, eventId],
  );
};

// MARK: Consumer

type ConsumerProps<T extends EventId> =
  | {
      eventId: T;
      observer: EventBusObserver<T>;
    }
  | {eventIds: T[]; observer: EventBusObserver<T>};

export const useEventBusConsumer = <T extends EventId>({observer, ...props}: ConsumerProps<T>) => {
  const ids = 'eventId' in props ? [props.eventId] : props.eventIds;
  const observerId = useMemo(() => uuidV4(), []);
  const eventBus = useContext(EventBusContext);
  useEffect(() => {
    ids.forEach(eventId => eventBus.addObserver(eventId, observerId, observer));
    return () => {
      ids.forEach(eventId => eventBus.removeObserver(eventId, observerId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observer, observerId, eventBus, ...ids]);
};
