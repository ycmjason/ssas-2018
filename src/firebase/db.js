import firebase from './index';

export const db = (() => {
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  return db;
})();
