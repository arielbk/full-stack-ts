import { isDefined } from '@full-stack-ts/shared';
import * as React from 'react';
import { useGetCurrentUserQuery } from './generated/graphql';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';

const App: React.FC = () => {
  const { loading, error, data } = useGetCurrentUserQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data.</p>;

  const { currentUser, suggestions = [], trends = [] } = data;
  const { favorites: rawFavorites } = currentUser;
  const favorites = (rawFavorites || [])
    .map((f) => f.tweet?.id)
    .filter(isDefined);
  return (
    <div>
      <LeftSidebar currentUser={currentUser} />
      <Header currentUser={currentUser} />
      <div id="container" className="wrapper nav-closed">
        <Timeline
          currentUserId={currentUser.id}
          currentUserFavorites={favorites}
        />
        <RightBar trends={trends} suggestions={suggestions} />
      </div>
    </div>
  );
};
export default App;
