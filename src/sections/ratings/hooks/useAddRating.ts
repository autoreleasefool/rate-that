import {useCallback} from 'react';
import {useDatabase} from 'shared/data/local/hooks/useDatabase';
import {Rating} from 'shared/data/local/schema';
import {Movie} from 'shared/data/tmdb/schema';
import {useEventBusProducer} from 'shared/util/EventBus';

interface AddRatingParams {
  notebookId: number;
  title: string;
  value: number;
  movie?: Movie;
}

export const useAddRating = () => {
  const db = useDatabase();
  const produceAddRatingEvent = useEventBusProducer({eventId: 'AddRating'});

  return useCallback(
    ({notebookId, movie, title, value}: AddRatingParams) => {
      async function addRating() {
        if (!db) {
          return;
        }
        const now = new Date().toISOString();
        try {
          // TODO: handle errors
          await db.executeSql(`
          INSERT INTO Rating (notebook_id, movie_id, movie_poster_path, title, value, created_at, updated_at) VALUES
            (
              ${notebookId},
              ${movie?.id ?? 'null'},
              "${movie?.basePosterPath ?? 'null'}",
              "${title}",
              ${value},
              "${now}",
              "${now}"
            );
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
