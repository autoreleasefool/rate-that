import {useCallback} from 'react';
import {useDatabase} from 'shared/data/local/hooks/useDatabase';
import {Notebook, NotebookType} from 'shared/data/local/schema';
import {useEventBusProducer} from 'shared/util/EventBus';

interface AddNotebookParams {
  title: string;
  type: NotebookType;
  hasImages: boolean;
}

export const useAddNotebook = () => {
  const db = useDatabase();
  const produceAddNotebookEvent = useEventBusProducer({eventId: 'AddNotebook'});

  return useCallback(
    ({title, type, hasImages}: AddNotebookParams) => {
      async function addNotebook() {
        if (!db) {
          return;
        }
        const now = new Date();
        try {
          // TODO: handle errors
          await db.executeSql(`
            INSERT INTO Notebook (title, type, created_at, updated_at, has_images) VALUES
              ("${title}", "${type}", "${now.toISOString()}", "${now.toISOString()}", ${hasImages ? 1 : 0});
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
