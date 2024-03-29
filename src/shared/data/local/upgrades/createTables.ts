import {Transaction} from 'react-native-sqlite-storage';

export async function dropTables(tx: Transaction) {
  tx.executeSql('DROP TABLE IF EXISTS Version;');
  tx.executeSql('DROP TABLE IF EXISTS Rating;');
  tx.executeSql('DROP TABLE IF EXISTS Notebook;');
}

export async function createTables(tx: Transaction) {
  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Version(
      id INTEGER PRIMARY KEY NOT NULL,
      version INTEGER
    )
  `);

  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Notebook(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      type TEXT,
      created_at TEXT,
      updated_at TEXT,
      has_images INTEGER
    );
  `);

  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Rating(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      notebook_id INTEGER,
      title TEXT,
      value INTEGER,
      created_at TEXT,
      updated_at TEXT,
      movie_id INTEGER,
      movie_poster_path TEXT,
      image_url TEXT,
      notes TEXT,
      FOREIGN KEY (notebook_id) REFERENCES Notebook(id)
    )
  `);

  tx.executeSql('INSERT INTO Version (version) VALUES (1);');
}
