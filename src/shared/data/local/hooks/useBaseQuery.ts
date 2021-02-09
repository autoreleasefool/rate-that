import {useCallback, useEffect, useRef, useState} from 'react';
import {useDatabase} from './useDatabase';

export interface BaseQueryResult<T> {
  isLoading: boolean;
  isRefreshing: boolean;
  error?: Error;
  data?: T;
  refresh: () => void;
}

interface BaseQueryProps {
  query: string;
  skip?: boolean;
}

export const useBaseQuery = <T>({query, skip}: BaseQueryProps): BaseQueryResult<T[]> => {
  const [didPerformQuery, setDidPerformQuery] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T[]>();
  const [error, setError] = useState<Error>();
  const db = useDatabase();

  const queryRef = useRef<string>();
  useEffect(() => {
    if (queryRef.current !== query) {
      queryRef.current = query;
      setDidPerformQuery(false);
    }
  }, [setDidPerformQuery, query]);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setError(undefined);
    setDidPerformQuery(false);
  }, [setIsRefreshing, setError, setDidPerformQuery]);

  useEffect(() => {
    if (!db || didPerformQuery || skip) {
      return;
    }

    const performFetch = async () => {
      try {
        const [result] = await db.executeSql(query);
        setData(result.rows.raw() as any);
        setError(undefined);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
      setIsRefreshing(false);
    };

    setDidPerformQuery(true);
    performFetch();
  }, [db, didPerformQuery, setDidPerformQuery, setData, setIsRefreshing, setIsLoading, setError, query, skip]);

  return {
    isLoading,
    isRefreshing,
    error,
    data,
    refresh,
  };
};
