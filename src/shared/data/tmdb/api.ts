import {TMDB_API_KEY} from '@env';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

interface RequestBuilder {
  path: string;
  query?: {
    [key: string]: string;
  };
}

export const buildRequestUrl = ({path, query}: RequestBuilder): string => {
  const queryString = Object.keys(query ?? {})
    .map(key => `${key}=${query![key]}`)
    .join('&');
  return `${TMDB_BASE_URL}/${path}?api_key=${TMDB_API_KEY}&${queryString}`;
};
