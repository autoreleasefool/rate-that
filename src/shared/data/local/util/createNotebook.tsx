import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {NotebookType} from 'shared/data/local/schema';

interface CreateNotebookProps {
  title: string;
  type: NotebookType;
  db: SQLiteDatabase;
}

export const createNotebook = async ({title, type, db}: CreateNotebookProps): Promise<void> => {
  await db.executeSql(`
    INSERT INTO Notebook (title, type_id, created_at, updated_at) VALUES
      (${title}, ${type}, ${new Date().toISOString()}, ${new Date().toISOString()})
  `);
};
