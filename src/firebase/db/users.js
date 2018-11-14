import db, {
  getServerTimestamp,
  transformDocumentRef,
} from './index';

const usersRef = db.collection('users');

export const findUserByUid = async uid => {
  const result = await transformDocumentRef(usersRef.doc(uid));
  if (!result) return null;
  return result;
};

export const findOrCreateUser = async user => {
  if (!user) throw Error('Expected user.');

  const found = await findUserByUid(user.uid);
  if (found) return found;

  const userRef = usersRef.doc(user.uid);
  await userRef.set({
    ...user,
    timestamps: {
      created: getServerTimestamp(),
    },
  });

  return transformDocumentRef(userRef);
};
