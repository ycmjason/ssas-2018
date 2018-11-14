import firebase from '../index';
import { mapValues } from '@/utils/array';

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;

export const getServerTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

export const transformDocumentSnapshot = async snapshot => {
  const doc = await snapshot.data();

  if (!doc) return null;

  if (doc.timestamps) {
    doc.timestamps = mapValues(doc.timestamps, timestamp => timestamp.toDate());
  }

  return {
    ...doc,
    id: snapshot.id,
    _ref: snapshot.ref,
  };
};

export const transformDocumentSnapshots = async snapshots => {
  return await Promise.all(snapshots.map(transformDocumentSnapshot));
};

export const transformQuerySnapshot = async querySnapshot => {
  return await transformDocumentSnapshots(querySnapshot.docs);
};

export const executeQuery = async query => {
  return await transformQuerySnapshot(await query.get());
};

export const transformDocumentRef = async docRef => {
  return await transformDocumentSnapshot(await docRef.get());
};

export const transformDocumentRefs = async refs => {
  return await Promise.all(refs.map(transformDocumentRef));
};
