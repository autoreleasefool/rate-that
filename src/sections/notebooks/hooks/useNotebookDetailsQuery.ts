import {useMemo} from 'react';
import {BaseQueryResult, useBaseQuery} from 'shared/data/local/hooks/useBaseQuery';
import {Notebook, NotebookType, Rating} from 'shared/data/local/schema';

enum SortOrder {
  ALPHABETICAL,
  RECENTLY_UPDATED,
  RATING,
}

interface NotebookDetailsQueryProps {
  id: number;
  filter?: string;
  sortOrder?: SortOrder;
}

type RatingFragment = Pick<Rating, 'id' | 'imageUrl' | 'title' | 'value' | 'notes' | 'updatedAt'>;

type NotebookFragment = Pick<Notebook, 'id' | 'updatedAt' | 'createdAt' | 'hasImages' | 'title' | 'type'> & {
  ratings: RatingFragment[];
};

type NotebookDetailsQueryResults = BaseQueryResult<NotebookFragment>;

interface NotebookDetailsQueryRow {
  notebookId: number;
  notebookTitle: string;
  notebookType: NotebookType;
  notebookUpdatedAt: string;
  notebookCreatedAt: string;
  notebookHasImages: number;
  ratingId: number;
  ratingTitle: string;
  ratingValue: number;
  ratingUpdatedAt: string;
  ratingMoviePosterPath: string | undefined;
  ratingImageUrl: string | undefined;
  ratingNotes: string | undefined;
}

export const useNotebookDetailsQuery = ({
  id,
  filter,
  sortOrder,
}: NotebookDetailsQueryProps): NotebookDetailsQueryResults => {
  let whereClause = `WHERE Notebook.id == ${id}`;
  if (filter) {
    whereClause += ` AND Rating.title LIKE "%${filter}%"`;
  }

  const orderByClause = buildOrderByClause(sortOrder ?? SortOrder.RECENTLY_UPDATED);

  const {isLoading, isRefreshing, data, error, refresh} = useBaseQuery<NotebookDetailsQueryRow>({
    query: `
    SELECT
      Notebook.id as notebookId,
      Notebook.title as notebookTitle,
      Notebook.created_at as notebookCreatedAt,
      Notebook.updated_at as notebookUpdatedAt,
      Notebook.type as notebookType,
      Notebook.has_images as notebookHasImages,
      Rating.id as ratingId,
      Rating.title as ratingTitle,
      Rating.value as ratingValue,
      Rating.updated_at as ratingUpdatedAt,
      Rating.movie_poster_path as ratingMoviePosterPath,
      Rating.image_url as ratingImageUrl,
      Rating.notes as ratingNotes
    FROM
      Notebook
    LEFT JOIN
      Rating on Rating.notebook_id=Notebook.id
    ${whereClause}
    ${orderByClause};
    `,
  });

  const notebook = useMemo((): NotebookFragment | undefined => {
    if (!data || data.length === 0) {
      return undefined;
    }

    const ratings = data
      .filter(row => row.ratingId)
      .map(
        (row): RatingFragment => ({
          id: row.ratingId,
          value: row.ratingValue,
          title: row.ratingTitle,
          notes: row.ratingNotes,
          updatedAt: new Date(row.ratingUpdatedAt),
          imageUrl: row.ratingImageUrl
            ? row.ratingImageUrl
            : row.ratingMoviePosterPath
            ? {basePosterPath: row.ratingMoviePosterPath}
            : undefined,
        }),
      );

    return {
      id: data[0].notebookId,
      createdAt: new Date(data[0].notebookCreatedAt),
      updatedAt: new Date(data[0].notebookUpdatedAt),
      title: data[0].notebookTitle,
      type: data[0].notebookType,
      hasImages: Boolean(data[0].notebookHasImages),
      ratings,
    };
  }, [data]);

  return {
    isLoading,
    isRefreshing,
    data: notebook,
    error,
    refresh,
  };
};

const buildOrderByClause = (sortOrder: SortOrder): string => {
  switch (sortOrder) {
    case SortOrder.ALPHABETICAL:
      return 'ORDER BY Rating.title, Rating.updated_at DESC';
    case SortOrder.RECENTLY_UPDATED:
      return 'ORDER BY Rating.updated_at DESC';
    case SortOrder.RATING:
      return 'ORDER BY Rating.value, Rating.title, Rating.updated_at DESC';
  }
};
