interface DataRow {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// MARK: Notebook

export enum NotebookType {
  MOVIES,
  OTHER,
}

export interface Notebook extends DataRow {
  title: string;
  type: NotebookType;
  ratings: Rating[];
  hasImages: boolean;
}

// MARK: Rating

export type RatingImage = string | {basePosterPath: string};

export interface Rating extends DataRow {
  title: string;
  value: number;
  movieId?: number;
  imageUrl?: RatingImage;
}
