import firebase from '../index';

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;
