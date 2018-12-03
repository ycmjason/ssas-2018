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

export const createOrUpdateUser = async user => {
  if (!user) throw Error('Expected user.');

  if (await findUserByUid(user.uid)) {
    return updateUser(user);
  }

  return createUser(user);
};

const updateUser = async (user) => {
  const foundUser = await findUserByUid(user.uid);
  if (!foundUser) {
    throw Error(`updateUser: No user (${user.uid}) found`);
  }

  const fieldsToBeUpdated = [
    'email',
    'link',
    'photoURL',
  ].filter(f => {
    if (!(f in user)) return false;
    return foundUser[f] !== user[f];
  });

  if (fieldsToBeUpdated.length > 0) {
    foundUser._ref.update({
      ...fieldsToBeUpdated.reduce((acc, f) => ({
        ...acc,
        [f]: user[f],
      }), {}),
      'timestamps.updated': getServerTimestamp(),
    });
  }
  return transformDocumentRef(foundUser._ref);
};

const createUser = async user => {
  const userRef = usersRef.doc(user.uid);
  await userRef.set({
    ...user,
    timestamps: {
      created: getServerTimestamp(),
    },
  });

  return transformDocumentRef(userRef);
};
