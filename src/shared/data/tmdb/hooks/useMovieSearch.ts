import {useEffect, useState} from 'react';
import {buildRequestUrl} from '../api';
import {useConfiguration} from './useConfiguration';
import {Movie} from '../schema';

interface MovieSearchParams {
  query: string;
}

interface MovieSearchResult {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  overview: string;
}

export interface UseMovieResult {
  results?: Movie[];
  error?: Error;
}

export const useMovieSearch = ({query}: MovieSearchParams): UseMovieResult => {
  const url = buildRequestUrl({path: 'search/movie', query: {query}});
  const configuration = useConfiguration();
  const [results, setResults] = useState<Movie[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const performQuery = async () => {
      if (!configuration || !query) {
        setResults([]);
        return;
      }

      console.log(`Performing query, ${url}`);
      try {
        const fetchResults = await fetch(url);
        const json = await fetchResults.json();
        const movieResults = json.results.map((result: MovieSearchResult) => ({
          id: result.id,
          title: result.title,
          overview: result.overview,
          releaseDate: result.release_date,
          basePosterPath: result.poster_path
            ? `${configuration.images.secure_base_url}{WIDTH}${result.poster_path}`
            : undefined,
        }));
        setResults(movieResults);
      } catch (err) {
        setError(err);
      }
    };

    // setDidPerformQuery(true);
    performQuery();
  }, [url, setError, setResults, configuration, query]);

  return {
    results,
    error,
  };
};
