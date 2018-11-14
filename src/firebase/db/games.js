import db, {
  getServerTimestamp,
  transformDocumentRefs,
  transformDocumentRef,
  executeQuery,
} from './index';

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

const transformGameRef = async gameRef => {
  return await transformGame(await transformDocumentRef(gameRef));
};

export const findGameById = async id => {
  const gameRef = gamesRef.doc(id);
  return await transformGameRef(gameRef);
};

export const findGamesForUser = async ({ _ref }) => {
  const games = await executeQuery(gamesRef.where('participants', 'array-contains', _ref));
  return await transformGames(games);
};

export const createGame = async ({ title, description }) => {
  const user = await getCurrentUser();
  if (!user) throw Error('Not signed in.');

  const userRef = (await getCurrentUser())._ref;
  const gameRef = await gamesRef.add({
    creator: userRef,
    title,
    description,
    participants: [userRef],
    timestamps: {
      created: getServerTimestamp(),
    },
  });

  const game = await transformDocumentRef(gameRef);
  return transformGame(game);
};
