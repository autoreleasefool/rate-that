import {useCallback} from 'react';
import {useEventBusProducer} from 'shared/util/EventBus';
import {createTables, dropTables} from '../upgrades/createTables';
import {useDatabase} from './useDatabase';

export const useResetDatabase = () => {
  const db = useDatabase();
  const produceResetEvent = useEventBusProducer({eventId: 'ResetDatabase'});
  return useCallback(() => {
    if (!__DEV__) {
      return;
    }

    db?.transaction(dropTables);
    db?.transaction(createTables);
    produceResetEvent(undefined);
  }, [db, produceResetEvent]);
};
