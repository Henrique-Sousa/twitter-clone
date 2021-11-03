import { FC } from 'react';
import Text from './Text';
import Author from './Author';
import Photo from './Photo';
import TrashIcon from './icons/TrashIcon';
import { UserResult } from '../lib/ApiResult';
import './Tweet.css';
import './icons/TrashIcon.css';

interface Props {
  tweetId: number;
  name: string;
  username: string;
  date: Date;
  text: string;
  photoUrl: string;
  loggedUser?: UserResult;
  handleStatusUpdate: (tweetId: number) => void;
}

const Tweet: FC<Props> = ({
  tweetId,
  name,
  username,
  date,
  text,
  photoUrl,
  loggedUser,
  handleStatusUpdate,
}) => {

  const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';

  const deleteTweet = async () : Promise<void> => {

    const token = localStorage.getItem('token');

    if (token) {
      try {
        await fetch(`${apiURL}/tweets/${tweetId}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });
        handleStatusUpdate(tweetId);
      } catch (error) {
        // ...
      }
    }
  };

  return (
    <article className="tweet">
      <Photo imageSrc={photoUrl} />
      <div>
        <Author name={name} username={username} date={date} />
        <Text value={text} />
        <div
          style={{ width: 20 }}
          onClick={async () => deleteTweet()}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          hidden={loggedUser?.username !== username}
        >
          <TrashIcon />
        </div>
      </div>
    </article>
  );
};

export default Tweet;
