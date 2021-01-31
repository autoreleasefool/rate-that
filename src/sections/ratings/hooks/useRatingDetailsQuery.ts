import {useMemo} from 'react';
import {useBaseQuery} from 'shared/data/local/hooks/useBaseQuery';
import {Rating} from 'shared/data/local/schema';

interface RatingDetailsQueryProps {
  id?: number;
}

interface RatingRow {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  value: number;
  movieId?: number;
  movieBasePosterPath?: string;
  imageUrl?: string;
}

export const useRatingDetailsQuery = ({id}: RatingDetailsQueryProps) => {
  let whereClause = `WHERE Rating.id == ${id}`;

  const {isLoading, isRefreshing, data, error, refresh} = useBaseQuery<RatingRow>({
    skip: id === undefined,
    query: `
      SELECT
        Rating.id as id,
        Rating.created_at as createdAt,
        Rating.updated_at as updatedAt,
        Rating.title as title,
        Rating.value as value,
        Rating.movie_id as movieId,
        Rating.movie_base_poster_path as movieBasePosterPath
        Rating.image_url as imageUrl
      FROM
        Rating
      ${whereClause};
    `,
  });

  const rating = useMemo((): Rating | undefined => {
    if (!data) {
      return undefined;
    }

    return {
      id: data[0].id,
      createdAt: new Date(data[0].createdAt),
      updatedAt: new Date(data[0].updatedAt),
      value: data[0].value,
      title: data[0].title,
      movieId: data[0].movieId,
      imageUrl: data[0].imageUrl
        ? data[0].imageUrl
        : data[0].movieBasePosterPath
        ? {basePosterPath: data[0].movieBasePosterPath}
        : undefined,
    };
  }, [data]);

  return {
    isLoading,
    isRefreshing,
    data: rating,
    error,
    refresh,
  };
};
