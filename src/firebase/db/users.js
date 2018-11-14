import db, {
  getServerTimestamp,
  transformDocumentRef,
} from './index';
import { getCurrentUser } from '@/firebase/auth';

const usersRef = db.collection('users');

export const findUserRefByUid = async uid => {
  return usersRef.doc(uid);
};

export const findUserByUid = async uid => {
  const result = await transformDocumentRef(usersRef.doc(uid));
  if (!result) return null;
  return result;
};

export const findOrCreateCurrentUser = async () => {
  const user = await getCurrentUser();
  if (!user) throw Error('Not signed in.');

  const found = await findUserByUid(user.uid);
  if (found) return found;

  const userRef = usersRef.doc(user.uid);
  await userRef.set({
    ...user,
    created: getServerTimestamp(),
  });

  return transformDocumentRef(userRef);
};

export const getCurrentUserRef = async () => {
  const user = await getCurrentUser();
  if (!user) throw Error('Not signed in.');

  return usersRef.doc(user.uid);
};
