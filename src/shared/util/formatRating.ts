import {RatingImage} from 'shared/data/local/schema';
import {ImageWidth} from 'shared/data/tmdb/schema';
import {formatPosterPath} from './formatMovie';

export function formatRatingImageUrl(imageUrl: RatingImage, width: ImageWidth): string | undefined {
  if (typeof imageUrl === 'string') {
    return imageUrl;
  } else {
    return formatPosterPath(imageUrl?.basePosterPath, width);
  }
}
