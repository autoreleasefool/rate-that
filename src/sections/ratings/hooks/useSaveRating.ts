import {useCallback} from 'react';
import {useDatabase} from 'shared/data/local/hooks/useDatabase';
import {Rating, RatingImage} from 'shared/data/local/schema';
import {useEventBusProducer} from 'shared/util/EventBus';

interface AddRatingParams {
  notebookId: number;
  title: string;
  value: number;
  date?: Date;
  movieId?: number;
  imageUrl?: RatingImage;
}

interface EditRatingParams {
  ratingId: number;
  value: number;
  date: Date;
}

type SaveRatingParams = AddRatingParams | EditRatingParams;

function isAddingRating(rating: SaveRatingParams): rating is AddRatingParams {
  return 'notebookId' in rating;
}

export const useSaveRating = () => {
  const db = useDatabase();
  const produceAddRatingEvent = useEventBusProducer({eventId: 'AddRating'});
  const produceEditRatingEvent = useEventBusProducer({eventId: 'EditRating'});

  const editRating = useCallback(
    ({ratingId, value, date}: EditRatingParams) => {
      async function edit() {
        if (!db) {
          return;
        }

        try {
          // TODO: handle errors
          await db.executeSql(`
          UPDATE Rating SET
            value = ${value},
            updated_at = "${date}"
          WHERE
            id = ${ratingId};
        `);
        } catch (err) {
          console.error(err);
        }
        produceEditRatingEvent({} as Rating);
      }

      edit();
    },
    [db, produceEditRatingEvent],
  );

  const addRating = useCallback(
    ({notebookId, title, value, date = new Date(), movieId, imageUrl}: AddRatingParams) => {
      async function add() {
        if (!db) {
          return;
        }

        const now = new Date();
        try {
          // TODO: handle errors
          await db.executeSql(`
            INSERT INTO Rating (notebook_id, movie_id, movie_poster_path, image_url, title, value, created_at, updated_at) VALUES
              (
                ${notebookId},
                ${movieId ?? 'null'},
                ${imageUrl && typeof imageUrl !== 'string' ? `"${imageUrl.basePosterPath}"` : 'null'},
                ${imageUrl && typeof imageUrl === 'string' ? `"${imageUrl}"` : 'null'},
                "${title}",
                ${value},
                "${now.toISOString()}",
                "${date.toISOString()}"
              );
          `);
        } catch (err) {
          console.error(err);
        }
        produceAddRatingEvent({} as Rating);
      }
      add();
    },
    [db, produceAddRatingEvent],
  );

  return useCallback(
    (rating: SaveRatingParams) => {
      if (isAddingRating(rating)) {
        addRating(rating);
      } else {
        editRating(rating);
      }
    },
    [addRating, editRating],
  );
};
