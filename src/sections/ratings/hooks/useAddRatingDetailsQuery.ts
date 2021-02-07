import {useMemo} from 'react';
import {BaseQueryResult, useBaseQuery} from 'shared/data/local/hooks/useBaseQuery';
import {Notebook, NotebookType, Rating} from 'shared/data/local/schema';
import {buildRatingImageUrl} from 'shared/data/local/util/ratingUtil';

interface AddRatingDetailsQueryProps {
  notebookId?: number;
  ratingId?: number;
}

type RatingsFragment = Pick<Rating, 'id' | 'imageUrl' | 'updatedAt' | 'title' | 'value'>;
type NotebookFragment = Pick<Notebook, 'id' | 'hasImages' | 'type'>;
interface Fragment {
  rating?: RatingsFragment;
  notebook: NotebookFragment;
}

interface AddRatingDetailsNotebookRow {
  notebookId: number;
  notebookType: NotebookType;
  notebookHasImages: boolean;
}

interface AddRatingDetailsRatingRow {
  ratingId: number;
  ratingUpdatedAt: string;
  ratingTitle: string;
  ratingValue: number;
  ratingMoviePosterPath: string;
  ratingImageUrl: string;
}

export const useAddRatingDetailsQuery = ({
  ratingId,
  notebookId,
}: AddRatingDetailsQueryProps): BaseQueryResult<Fragment> => {
  const {
    isLoading: isLoadingNotebook,
    isRefreshing: isRefreshingNotebook,
    data: notebookData,
    error: notebookError,
    refresh: refreshNotebook,
  } = useBaseQuery<AddRatingDetailsNotebookRow>({
    skip: notebookId === undefined,
    query: `
      SELECT
        Notebook.id as notebookId,
        Notebook.type as notebookType,
        Notebook.has_images as notebookHasImages
      FROM
        Notebook
      WHERE
        Notebook.id == ${notebookId};
    `,
  });

  const {
    isLoading: isLoadingRating,
    isRefreshing: isRefreshingRating,
    data: ratingData,
    error: ratingError,
    refresh: refreshRating,
  } = useBaseQuery<AddRatingDetailsNotebookRow & AddRatingDetailsRatingRow>({
    skip: ratingId === undefined,
    query: `
      SELECT
        Notebook.id as notebookId,
        Notebook.type as notebookType,
        Notebook.has_images as notebookHasImages,
        Rating.id as ratingId,
        Rating.updated_at as ratingUpdatedAt,
        Rating.title as ratingTitle,
        Rating.value as ratingValue,
        Rating.movie_poster_path as ratingMoviePosterPath,
        Rating.image_url as ratingImageUrl
      FROM
        Rating
      JOIN
        Notebook ON Notebook.id == Rating.notebook_id
      WHERE Rating.id == ${ratingId};
    `,
  });

  const isNotebookQuery = notebookId !== undefined;

  const results = useMemo((): Fragment | undefined => {
    if (notebookId && notebookData && notebookData.length > 0) {
      return {
        notebook: {
          id: notebookData[0].notebookId,
          hasImages: notebookData[0].notebookHasImages,
          type: notebookData[0].notebookType,
        },
      };
    } else if (ratingId && ratingData) {
      return {
        notebook: {
          id: ratingData[0].notebookId,
          hasImages: ratingData[0].notebookHasImages,
          type: ratingData[0].notebookType,
        },
        rating: {
          id: ratingData[0].ratingId,
          title: ratingData[0].ratingTitle,
          value: ratingData[0].ratingValue,
          updatedAt: new Date(ratingData[0].ratingUpdatedAt),
          ...buildRatingImageUrl(ratingData[0]),
        },
      };
    }

    return undefined;
  }, [ratingId, ratingData, notebookId, notebookData]);

  return {
    isLoading: isNotebookQuery ? isLoadingNotebook : isLoadingRating,
    isRefreshing: isNotebookQuery ? isRefreshingNotebook : isRefreshingRating,
    data: results,
    error: isNotebookQuery ? notebookError : ratingError,
    refresh: isNotebookQuery ? refreshNotebook : refreshRating,
  };
};
