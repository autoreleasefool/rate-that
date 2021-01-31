import {useCallback} from 'react';
import {useDatabase} from 'shared/data/local/hooks/useDatabase';
import {useEventBusProducer} from 'shared/util/EventBus';

export const useDeleteNotebook = () => {
  const db = useDatabase();
  const produceDeleteNotebookEvent = useEventBusProducer({eventId: 'DeleteNotebook'});
  return useCallback(
    (id: number) => {
      db?.executeSql(`
        DELETE FROM Notebook WHERE Notebook.id=${id};
      `);
      produceDeleteNotebookEvent(undefined);
    },
    [db, produceDeleteNotebookEvent],
  );
};
