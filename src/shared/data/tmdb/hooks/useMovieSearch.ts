import {useEffect, useState} from 'react';
import {buildRequestUrl} from '../api';

interface MovieSearchParams {
  query: string;
  // limit: number;
  // pagination?: {
  //   limit: number;
  //   offset: number;
  // };
}

export interface MovieSearchResult {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
}

export interface UseMovieResult {
  results?: MovieSearchResult[];
  error?: Error;
}

export const useMovieSearch = ({query}: MovieSearchParams): UseMovieResult => {
  const url = buildRequestUrl({path: 'search/movie', query: {query}});
  // const [didPerformQuery, setDidPerformQuery] = useState(false);
  const [results, setResults] = useState<MovieSearchResult[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    // if (didPerformQuery) {
    //   return;
    // }

    const performQuery = async () => {
      console.log(`Performing query, ${url}`);
      try {
        const result = await fetch(url);
        const json = await result.json();
        console.log(`Result, ${JSON.stringify(json)}`);
        setResults(json.results);
      } catch (err) {
        setError(err);
      }
    };

    // setDidPerformQuery(true);
    performQuery();
  }, [url, setError, setResults]);

  return {
    results,
    error,
  };
};
