import db, {
  getServerTimestamp,
  transformDocumentRef,
  executeQuery,
} from './index';
import { getCurrentUser } from '@/firebase/auth';

const gamesRef = db.collection('games');

export const findGamesForUser = async uid => {
  return await executeQuery(gamesRef.where('participants', 'array-contains', uid));
};

export const createGame = async ({ title, description }) => {
  const user = await getCurrentUser();
  if (!user) throw Error('Not signed in.');

  const { uid } = user;

  const gameRef = await gamesRef.add({
    creator_uid: uid,
    title,
    description,
    participants: [uid],
    created: getServerTimestamp(),
  });

  const game = await transformDocumentRef(gameRef);
  return game;
};
