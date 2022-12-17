import Query from './resolvers/Query';
import Db, { DbTweet, DbUser } from './db';
import { Resolvers } from './resolvers-types.generated';
import User from './resolvers/User';
import Tweet from './resolvers/Tweet';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbTweetToFavoriteCountMap: Record<string, number>;
  dbUserCache: Record<string, DbUser>;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  User,
  Tweet,
};

export default resolvers;
