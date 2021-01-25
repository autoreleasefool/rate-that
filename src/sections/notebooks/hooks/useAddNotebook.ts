import {useCallback} from 'react';
import {useDatabase} from 'shared/data/local/hooks/useDatabase';
import {Notebook, NotebookType} from 'shared/data/local/schema';
import {useEventBusProducer} from 'shared/util/EventBus';

interface AddNotebookParams {
  title: string;
  type: NotebookType;
}

export const useAddNotebook = () => {
  const db = useDatabase();
  const produceAddNotebookEvent = useEventBusProducer({eventId: 'AddNotebook'});

  return useCallback(
    ({title, type}: AddNotebookParams) => {
      async function addNotebook() {
        if (!db) {
          return;
        }
        const now = new Date().toISOString();
        try {
          // TODO: handle errors
          await db.executeSql(`
          INSERT INTO Notebook (title, type_id, created_at, updated_at) VALUES
            ("${title}", ${type}, "${now}", "${now}");
        `);
        } catch (err) {
          console.error(err);
        }
        produceAddNotebookEvent({} as Notebook);
      }
      addNotebook();
    },
    [db, produceAddNotebookEvent],
  );
};
