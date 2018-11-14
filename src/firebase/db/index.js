import firebase from '../index';

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;

export const getServerTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

export const transformTimestamp = timestamp => timestamp.toDate();

export const transformDocumentSnapshot = async snapshot => {
  const doc = await snapshot.data();

  if (!doc) return null;

  doc.created = transformTimestamp(doc.created);

  return {
    id: snapshot.id,
    ...doc,
  };
};

export const transformDocumentRef = async docRef => {
  return transformDocumentSnapshot(await docRef.get());
};

export const transformDocumentRefs = async refs => {
  return await Promise.all(refs.map(transformDocumentRef));
};

export const transformQuerySnapshot = async querySnapshot => {
  return await Promise.all(querySnapshot.docs.map(transformDocumentSnapshot));
};

export const executeQuery = async query => {
  return await transformQuerySnapshot(await query.get());
};
