import firebase from '/firebase';

const db = firebase.firestore();

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

export const transformValue = async v => {
  if (!v) return v;

  if (v instanceof firebase.firestore.DocumentReference) {
    const doc = await transformDocumentRef(v);
    if (!doc) {
      console.error('Cannot find', v);
    }
    return doc;
  }

  if (v instanceof firebase.firestore.Timestamp) {
    return v.toDate();
  }

  if (Array.isArray(v)) {
    return await transformDocumentRefs(v);
  }

  if (typeof v === 'object') {
    return await transformMap(v);
  }

  return v;
};

export const transformMap = async map => {
  return (await Promise.all(Object.entries(map).map(async ([k, v]) => [k, await transformValue(v)]))).reduce(
    (newMap, [k, v]) => ({
      ...newMap,
      [k]: v,
    }),
    {},
  );
};

export const transformDocumentRef = async docRef => {
  return await transformDocumentSnapshot(await docRef.get());
};

export const transformDocumentRefs = async refs => {
  return await Promise.all(refs.map(transformValue));
};
