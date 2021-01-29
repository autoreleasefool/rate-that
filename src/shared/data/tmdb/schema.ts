export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  basePosterPath?: string;
}

export type ImageWidth = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
