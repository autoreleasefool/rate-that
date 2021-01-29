import {Transaction} from 'react-native-sqlite-storage';

export async function createTables(tx: Transaction) {
  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Version(
      id INTEGER PRIMARY KEY NOT NULL,
      version INTEGER
    )
  `);

  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Notebook(
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT,
      type_id INTEGER,
      created_at TEXT,
      updated_at TEXT,
      FOREIGN KEY (type_id) REFERENCES NotebookType(id)
    );
  `);

  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Rating(
      id INTEGER PRIMARY KEY NOT NULL,
      notebook_id INTEGER,
      title TEXT,
      value INTEGER,
      image_url TEXT,
      created_at TEXT,
      updated_at TEXT,
      movie_id INTEGER,
      FOREIGN KEY (notebook_id) REFERENCES Notebook(id)
    )
  `);

  tx.executeSql('INSERT INTO Version (version) VALUES (1);');
}
