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
}

// MARK: Rating

export interface Rating extends DataRow {
  title: string;
  value: number;
  imageUrl: string;
}
