import {useEffect, useState} from 'react';
import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import {createTables} from '../upgrades/createTables';

const DATABASE_VERSION = 1;

async function getDatabaseVersion(db: SQLiteDatabase): Promise<number> {
  try {
    const [result] = await db.executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1;');
    if (result.rows && result.rows.length > 0) {
      return result.rows.item(0).version as number;
    }
  } catch (err) {
    console.error(err);
  }

  return 0;
}

async function performUpdates(db: SQLiteDatabase, prevVersion: number, currentVersion: number) {
  if (prevVersion >= currentVersion) {
    return;
  }

  switch (prevVersion) {
    case 0:
      db.transaction(createTables);
  }

  performUpdates(db, prevVersion + 1, currentVersion);
}

export const useDatabase = () => {
  const [db, setDb] = useState<SQLiteDatabase>();

  useEffect(() => {
    async function initialize() {
      if (!db) {
        const database = await openDatabase({
          name: 'ratings.db',
          location: 'default',
        });

        const previousVersion = await getDatabaseVersion(database);
        performUpdates(database, previousVersion, DATABASE_VERSION);

        setDb(database);
      }
    }

    initialize();
  }, [db, setDb]);

  return db;
};
