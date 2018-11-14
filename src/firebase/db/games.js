import db, {
  getServerTimestamp,
  transformDocumentRefs,
  transformDocumentRef,
  executeQuery,
} from './index';

import { findUserRefByUid, getCurrentUserRef } from './users';
import { getCurrentUser } from '@/firebase/auth';

const gamesRef = db.collection('games');

const transformGame = async game => {
  return {
    ...game,
    creator: await transformDocumentRef(game.creator),
    participants: await transformDocumentRefs(game.participants),
  };
};

const transformGames = async games => {
  return await Promise.all(games.map(transformGame));
};

export const findGamesForUser = async uid => {
  const games = await executeQuery(gamesRef.where('participants', 'array-contains', await findUserRefByUid(uid)));
  return await transformGames(games);
};

export const createGame = async ({ title, description }) => {
  const user = await getCurrentUser();
  if (!user) throw Error('Not signed in.');

  const userRef = await getCurrentUserRef();
  const gameRef = await gamesRef.add({
    creator: userRef,
    title,
    description,
    participants: [userRef],
    created: getServerTimestamp(),
  });

  const game = await transformDocumentRef(gameRef);
  return transformGame(game);
};
