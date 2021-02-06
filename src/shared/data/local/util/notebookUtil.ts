import {NotebookType} from 'shared/data/local/schema';

export function formatType(type: NotebookType | string): string {
  switch (type) {
    case NotebookType.MOVIES:
      return 'Movies';
    case NotebookType.OTHER:
      return 'General';
    default:
      return 'Something';
  }
}
