import {format, parse} from 'date-fns';
import {ImageWidth, Movie} from 'shared/data/tmdb/schema';

export function formatTitle(movie: Movie): string {
  if (movie.releaseDate) {
    const releaseDate = parse(movie.releaseDate, 'yyyy-MM-dd', new Date());
    const formattedDate = format(releaseDate, 'yyyy');
    return `${movie.title} (${formattedDate})`;
  }

  return `${movie.title} (N/A)`;
}

export function formatOverview(movie: Movie): string {
  return `${movie.overview.slice(0, 120).trimEnd()}...`;
}

export function formatPosterPath(path: string | undefined, width: ImageWidth): string | undefined {
  return path?.replace(/\{WIDTH\}/, width);
}
