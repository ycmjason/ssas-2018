import firebase from '../index';

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;

export const getServerTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

export const transformDocumentSnapshot = async snapshot => {
  const doc = await snapshot.data();

  if (!doc) return null;

  return {
    ...(await transformMap(doc)),
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

export const transformMap = async map => {
  return (await Promise.all(Object.entries(map).map(async ([k, v]) => {
    if (v instanceof firebase.firestore.DocumentReference) {
      return [k, await transformDocumentRef(v)];
    }

    if (v instanceof firebase.firestore.Timestamp) {
      return [k, v.toDate()];
    }

    if (Array.isArray(v)) {
      return [k, await transformDocumentRefs(v)];
    }

    if (typeof v === 'object') {
      return [k, await transformMap(v)];
    }

    return [k, v];
  }))).reduce((newMap, [k, v]) => ({
    ...newMap,
    [k]: v,
  }), {});
};

export const transformDocumentRef = async docRef => {
  return await transformDocumentSnapshot(await docRef.get());
};

export const transformDocumentRefs = async refs => {
  return await Promise.all(refs.map(transformDocumentRef));
};
