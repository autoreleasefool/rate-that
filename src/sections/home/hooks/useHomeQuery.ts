import {useMemo} from 'react';
import {Notebook, NotebookType, Rating} from 'shared/data/local/schema';
import {useBaseQuery, BaseQueryResult} from 'shared/data/local/hooks/useBaseQuery';
import {buildRatingImageUrl} from 'shared/data/local/util/ratingUtil';

enum SortOrder {
  ALPHABETICAL,
  RECENTLY_UPDATED,
}

interface HomeQueryProps {
  filter?: string;
  sortOrder?: SortOrder;
}

type RatingFragment = Pick<Rating, 'id' | 'imageUrl' | 'title' | 'value'>;

type NotebookFragment = Pick<Notebook, 'id' | 'hasImages' | 'title' | 'type'> & {
  ratings: RatingFragment[];
};

type HomeQueryResults = BaseQueryResult<NotebookFragment[]>;
interface HomeQueryRow {
  notebookId: number;
  notebookTitle: string;
  notebookType: NotebookType;
  notebookHasImages: number;
  ratingId: number;
  ratingTitle: string;
  ratingValue: number;
  ratingMoviePosterPath: string;
  ratingImageUrl: string;
}

export const useHomeQuery = ({filter, sortOrder}: HomeQueryProps): HomeQueryResults => {
  const whereClause = filter ? `WHERE Notebook.title LIKE '%${filter}%'` : '';
  const orderByClause = buildOrderByClause(sortOrder ?? SortOrder.RECENTLY_UPDATED);

  const {isLoading, isRefreshing, data, error, refresh} = useBaseQuery<HomeQueryRow>({
    query: `
    SELECT
      Notebook.id as notebookId,
      Notebook.title as notebookTitle,
      Notebook.type as notebookType,
      Notebook.has_images as notebookHasImages,
      Rating.id as ratingId,
      Rating.title as ratingTitle,
      Rating.value as ratingValue,
      Rating.movie_poster_path as ratingMoviePosterPath,
      Rating.image_url as ratingImageUrl
    FROM
      Notebook
    LEFT JOIN
      Rating on Rating.notebook_id=Notebook.id
    ${whereClause}
    ${orderByClause};
  `,
  });

  const rows = useMemo(() => {
    if (!data) {
      return undefined;
    }

    let lastNotebookId: number | undefined;
    const notebooks: NotebookFragment[] = [];
    for (const row of data) {
      if (row.notebookId !== lastNotebookId) {
        lastNotebookId = row.notebookId;
        notebooks.push({
          id: row.notebookId,
          title: row.notebookTitle,
          type: row.notebookType,
          hasImages: Boolean(row.notebookHasImages),
          ratings: [],
        });
      }

      if (row.ratingId) {
        notebooks[notebooks.length - 1].ratings.push({
          id: row.ratingId,
          title: row.ratingTitle,
          value: row.ratingValue,
          ...buildRatingImageUrl(row),
        });
      }
    }

    return notebooks;
  }, [data]);

  return {
    isLoading,
    isRefreshing,
    data: rows,
    error,
    refresh,
  };
};

const buildOrderByClause = (sortOrder: SortOrder): string => {
  switch (sortOrder) {
    case SortOrder.ALPHABETICAL:
      return 'ORDER BY Notebook.title, Notebook.updated_at DESC, Rating.updated_at DESC';
    case SortOrder.RECENTLY_UPDATED:
      return 'ORDER BY Notebook.updated_at DESC, Rating.updated_at DESC';
  }
};
