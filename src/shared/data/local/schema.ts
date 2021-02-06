interface DataRow {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// MARK: Notebook

export enum NotebookType {
  OTHER = 'OTHER',
  MOVIES = 'MOVIES',
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
  movieId: number | undefined;
  imageUrl: RatingImage | undefined;
  notes: string | undefined;
}
