import {Rating, RatingImage} from 'shared/data/local/schema';
import {ImageWidth} from 'shared/data/tmdb/schema';
import {formatPosterPath} from 'shared/data/tmdb/util/movieUtil';

export function buildRatingImageUrl(arg: {
  ratingMoviePosterPath: string | undefined;
  ratingImageUrl: string | undefined;
}): Pick<Rating, 'imageUrl'> {
  if ('ratingImageUrl' in arg && arg.ratingImageUrl !== undefined && arg.ratingImageUrl !== null) {
    return {imageUrl: arg.ratingImageUrl};
  } else if (
    'ratingMoviePosterPath' in arg &&
    arg.ratingMoviePosterPath !== undefined &&
    arg.ratingMoviePosterPath !== null
  ) {
    return {imageUrl: {basePosterPath: arg.ratingMoviePosterPath}};
  }

  return {imageUrl: undefined};
}

export function formatRatingImageUrl(imageUrl: RatingImage, width: ImageWidth): string | undefined {
  if (typeof imageUrl === 'string') {
    return imageUrl;
  } else {
    return formatPosterPath(imageUrl?.basePosterPath, width);
  }
}
