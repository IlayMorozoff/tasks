import { IUser } from '../interfaces';

export class Database {
  public db: IDBDatabase = null;

  init(dbName: string, version?: number):Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const iDB = window.indexedDB;
      const openRequest = iDB.open(dbName, version);
      openRequest.onupgradeneeded = () => {
        const database = openRequest.result;
        this.db = database;
        const store = database.createObjectStore('collectionOfUsers', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('firstName', 'firstName');
        store.createIndex('lastName', 'lastName');
        store.createIndex('email', 'email', { unique: true });
        store.createIndex('score', 'score');
      };
      openRequest.onsuccess = () => {
        this.db = openRequest.result;
        resolve(this.db);
      };

      openRequest.onerror = () => {
        reject(new Error('failed to initialize the database'));
      };
    });
  }

  write<RecordType>(collection: string, data: RecordType, email: string):Promise<RecordType> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(collection, 'readwrite');
      if (transaction) {
        const store = transaction.objectStore(collection);
        const index = store.index('email');
        const request = index.get(email);
        request.onsuccess = () => {
          const matching: RecordType = request.result;
          if (matching) {
            const record: RecordType = request.result;
            // eslint-disable-next-line @typescript-eslint/dot-notation
            store.put({ ...data, id: record['id'] });
            resolve(record);
          } else {
            store.add(data);
            resolve(null);
          }
        };
        request.onerror = () => {
          reject(new Error('failed to write data to the database'));
        };
      }
    });
  }

  readAll(collection: string): Promise<Array<IUser>> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(collection, 'readonly');
      const store = transaction.objectStore(collection);
      const result = store.getAll();

      transaction.oncomplete = () => {
        resolve(result.result);
      };

      transaction.onerror = () => {
        reject(result.error);
      };
    });
  }

  readFiltered(collection: string): Promise<Array<IUser>> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(collection, 'readonly');
      const store = transaction.objectStore(collection);
      const result = store.index('score').openCursor(null, 'prev');
      const sortedData:Array<IUser> = [];
      result.onsuccess = () => {
        const cursor = result.result;
        if (cursor) {
          if (sortedData.length < 10) {
            sortedData.push(cursor.value);
            cursor.continue();
          }
        }
      };
      result.onerror = () => {
        reject(new Error('could not find data to sort'));
      };
      transaction.oncomplete = () => {
        resolve(sortedData);
      };
    });
  }
}

export const iDB = new Database();
