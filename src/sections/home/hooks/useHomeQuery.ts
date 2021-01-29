import {useMemo} from 'react';
import {Notebook, NotebookType} from 'shared/data/local/schema';
import {useBaseQuery, BaseQueryResult} from 'shared/data/local/hooks/useBaseQuery';

enum SortOrder {
  ALPHABETICAL,
  RECENTLY_UPDATED,
}

interface HomeQueryProps {
  filter?: string;
  sortOrder?: SortOrder;
}

interface HomeQueryResults extends BaseQueryResult<Notebook[]> {}

interface HomeQueryRow {
  notebookId: number;
  notebookTitle: string;
  notebookType: NotebookType;
  notebookUpdatedAt: string;
  notebookCreatedAt: string;
  ratingId: number;
  ratingTitle: string;
  ratingValue: number;
  ratingUpdatedAt: string;
  ratingCreatedAt: string;
  ratingMovieId?: number;
  ratingMoviePosterPath?: string;
}

export const useHomeQuery = ({filter, sortOrder}: HomeQueryProps): HomeQueryResults => {
  const whereClause = filter ? `WHERE Notebook.title LIKE '%${filter}%'` : '';
  const orderByClause = buildOrderByClause(sortOrder ?? SortOrder.RECENTLY_UPDATED);

  const {isLoading, isRefreshing, data, error, refresh} = useBaseQuery<HomeQueryRow>({
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
      Rating.updated_at as ratingUpdatedAt,
      Rating.created_at as ratingCreatedAt,
      Rating.movie_id as ratingMovieId,
      Rating.movie_poster_path as ratingMoviePosterPath
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
    const notebooks: Notebook[] = [];
    for (const row of data) {
      if (row.notebookId !== lastNotebookId) {
        lastNotebookId = row.notebookId;
        notebooks.push({
          id: row.notebookId,
          createdAt: new Date(row.notebookCreatedAt),
          updatedAt: new Date(row.notebookUpdatedAt),
          title: row.notebookTitle,
          type: row.notebookType,
          ratings: [],
        });
      }

      if (row.ratingId) {
        notebooks[notebooks.length - 1].ratings.push({
          id: row.ratingId,
          createdAt: new Date(row.ratingCreatedAt),
          updatedAt: new Date(row.ratingUpdatedAt),
          title: row.ratingTitle,
          value: row.ratingValue,
          movieId: row.ratingMovieId,
          movieBasePosterPath: row.ratingMoviePosterPath,
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
      return 'ORDER BY notebookTitle, notebookUpdatedAt DESC, ratingUpdatedAt DESC';
    case SortOrder.RECENTLY_UPDATED:
      return 'ORDER BY notebookUpdatedAt DESC, ratingUpdatedAt DESC';
  }
};
