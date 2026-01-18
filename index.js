import { adoptDB, adoptRequest } from './adapters.js';

// Open the database
const openRequest = indexedDB.open('test', 1);
openRequest.addEventListener('upgradeneeded', (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
  store.createIndex('name', 'name', { unique: false });
});
const database = await adoptRequest(openRequest);
window.db = adoptDB(database);


// // Add a record to the database
// const tx = db.transaction('users', 'readwrite');
// const store = tx.objectStore('users');
// await store.add({ name: 'David', lastName: 'Totrashvili', age: 35 });

// // Get all records from the database
// const users = await store.getAll();
// const user = await store.get(1);

// const index = await store.index('name');
// const userByIndex = await index.get('David');

// console.log('users', users, user, userByIndex);
