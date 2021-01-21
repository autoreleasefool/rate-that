import {useCallback} from 'react';
import {useDatabase} from 'shared/data/hooks/useDatabase';
import {Rating} from 'shared/data/schema';
import {useEventBusProducer} from 'shared/util/EventBus';

interface AddRatingParams {
  notebookId: number;
  title: string;
  value: number;
}

export const useAddRating = () => {
  const db = useDatabase();
  const produceAddRatingEvent = useEventBusProducer({eventId: 'AddRating'});

  return useCallback(
    ({notebookId, title, value}: AddRatingParams) => {
      async function addRating() {
        if (!db) {
          return;
        }
        const now = new Date().toISOString();
        try {
          // TODO: handle errors
          await db.executeSql(`
          INSERT INTO Rating (notebook_id, title, value, created_at, updated_at) VALUES
            (${notebookId}, "${title}", ${value}, "${now}", "${now}");
        `);
        } catch (err) {
          console.error(err);
        }
        produceAddRatingEvent({} as Rating);
      }
      addRating();
    },
    [db, produceAddRatingEvent],
  );
};
