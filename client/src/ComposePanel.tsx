import {
  faChartBar,
  faComment,
  faFilm,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import {
  refetchGetCurrentUserQuery,
  refetchGetTimelineTweetsQuery,
  useCreateNewTweetMutation,
} from './generated/graphql';

export interface ComposePanelProps {
  currentUser: { id: string };
}
const ComposePanel: React.FC<ComposePanelProps> = ({ currentUser }) => {
  const [createNewTweet, { error }] = useCreateNewTweetMutation();
  if (error) return <p>Error creating new tweet: {error}</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textarea = e.currentTarget.querySelector('textarea');
    if (!textarea) throw new Error('No textarea found');
    const body = textarea.value;
    createNewTweet({
      variables: { userId: currentUser.id, body },
      refetchQueries: [
        refetchGetTimelineTweetsQuery(),
        refetchGetCurrentUserQuery(),
      ],
    })
      .then(() => {
        textarea.value = '';
      })
      .catch((err: unknown) => console.error('Error creating new tweet', err));
  };
  return (
    <div className="new-tweet">
      <form onSubmit={handleSubmit}>
        <textarea name="body" placeholder="What's happening?"></textarea>
        <div className="btns">
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faFilm} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faChartBar} />
            </button>
          </div>
          <div className="btn">
            <button type="submit" className="blue">
              <FontAwesomeIcon icon={faComment} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ComposePanel;
