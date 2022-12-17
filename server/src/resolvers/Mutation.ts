import { favoriteTransform, tweetTransform } from '../transforms';
import { TwitterResolverContext } from '../resolvers';
import { MutationResolvers } from '../resolvers-types.generated';

const mutationTwitterResolver: MutationResolvers<TwitterResolverContext> = {
  async createTweet(_parent, args, { dbTweetCache, db }) {
    const { body, userId } = args;
    const dbTweet = await db.createTweet({
      message: body,
      userId,
    });
    const dbTweetMap = (dbTweetCache ||= {});
    dbTweetMap[dbTweet.id] = dbTweet;
    return tweetTransform(dbTweet);
  },
  async createFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fave = await db.createFavorite(favorite);
    return {
      ...favoriteTransform(fave),
      user: db.getUserById(fave.userId),
      tweet: tweetTransform(db.getTweetById(fave.tweetId)),
    };
  },
  async deleteFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fave = await db.deleteFavorite(favorite);
    return {
      ...favoriteTransform(fave),
      user: db.getUserById(fave.userId),
      tweet: tweetTransform(db.getTweetById(fave.tweetId)),
    };
  },
};

export default mutationTwitterResolver;
