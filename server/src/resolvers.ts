import Db, { DbTweet, DbUser } from './db';
import { Resolvers } from './resolvers-types.generated';
import mutationTwitterResolver from './resolvers/Mutation';
import Query from './resolvers/Query';
import Trend from './resolvers/Trend';
import Tweet from './resolvers/Tweet';
import User from './resolvers/User';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbTweetToFavoriteCountMap: Record<string, number>;
  dbUserCache: Record<string, DbUser>;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  Mutation: mutationTwitterResolver,
  User,
  Tweet,
  Trend,
};

export default resolvers;
