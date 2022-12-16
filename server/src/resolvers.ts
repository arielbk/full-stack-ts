import Query from './resolvers/Query';
import Db from './db';
import { Resolvers } from './resolvers-types.generated';

export interface TwitterResolverContext {
  db: Db;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
};

export default resolvers;
