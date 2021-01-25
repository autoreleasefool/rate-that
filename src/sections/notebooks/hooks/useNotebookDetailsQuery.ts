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

interface NotebookDetailsQueryResults extends BaseQueryResult<Notebook> {}

interface NotebookDetailsQueryRow {
  notebookId: number;
  notebookTitle: string;
  notebookType: NotebookType;
  notebookUpdatedAt: string;
  notebookCreatedAt: string;
  ratingId: number;
  ratingTitle: string;
  ratingValue: number;
  ratingImageUrl: string;
  ratingUpdatedAt: string;
  ratingCreatedAt: string;
}

export const useNotebookDetailsQuery = ({
  id,
  filter,
  sortOrder,
}: NotebookDetailsQueryProps): NotebookDetailsQueryResults => {
  let whereClause = `WHERE Notebook.id == ${id}`;
  if (filter) {
    whereClause += `AND Rating.title LIKE %${filter}%`;
  }

  const orderByClause = buildOrderByClause(sortOrder ?? SortOrder.RECENTLY_UPDATED);

  const {isLoading, isRefreshing, data, error, refresh} = useBaseQuery<NotebookDetailsQueryRow>({
    query: `
    SELECT
      Notebook.id as notebookId,
      Notebook.title as notebookTitle,
      Notebook.created_at as notebookCreatedAt,
      Notebook.updated_at as notebookUpdatedAt,
      Notebook.type_id as notebookType,
      Rating.id as ratingId,
      Rating.title as ratingTitle,
      Rating.value as ratingValue,
      Rating.image_url as ratingImageUrl,
      Rating.updated_at as ratingUpdatedAt,
      Rating.created_at as ratingCreatedAt
    FROM
      Notebook
    LEFT JOIN
      Rating on Rating.notebook_id=Notebook.id
    ${whereClause}
    ${orderByClause};
    `,
  });

  const notebook = useMemo(() => {
    if (!data) {
      return;
    }

    const ratings: Rating[] = data
      .filter(row => row.ratingId)
      .map(row => ({
        id: row.ratingId,
        createdAt: new Date(row.ratingCreatedAt),
        updatedAt: new Date(row.ratingUpdatedAt),
        value: row.ratingValue,
        title: row.ratingTitle,
        imageUrl: row.ratingImageUrl,
      }));

    const value: Notebook = {
      id: data[0].notebookId,
      createdAt: new Date(data[0].notebookCreatedAt),
      updatedAt: new Date(data[0].notebookUpdatedAt),
      title: data[0].notebookTitle,
      type: data[0].notebookType,
      ratings,
    };

    return value;
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
      return 'ORDER BY ratingTitle, ratingUpdatedAt';
    case SortOrder.RECENTLY_UPDATED:
      return 'ORDER BY ratingUpdatedAt';
    case SortOrder.RATING:
      return 'ORDER BY ratingValue, ratingTitle, ratingUpdatedAt';
  }
};
