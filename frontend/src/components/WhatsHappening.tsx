import {
  FC, useState, Dispatch, SetStateAction, FormEvent,
} from 'react';
import Toolbar from './Toolbar';
import Photo from './Photo';
import './WhatsHappening.css';
import { UserResult } from '../lib/ApiResult';
import { TweetObject } from './Objects';

interface Props {
  apiURL: string;
  handleStatusUpdate: (tweet: TweetObject) => void;
}

const WhatsHappening: FC<Props> = ({
  apiURL,
  handleStatusUpdate,
}) => {

  const [authorId, setAuthorId]: [number, Dispatch<SetStateAction<number>>] = useState<number>(-1);
  const [text, setText]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tweet = { authorId, text };

    if (tweet.text !== '' && tweet.authorId >= 0) {
      await fetch(`${apiURL}/tweets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweet),
      });

      const response = await fetch(`${apiURL}/users/${authorId}`, { mode: 'cors' });
      const user: UserResult = await response.json();
      const tweetObject: TweetObject = {
        id: -1,
        text,
        createdAt: new Date(Date.now()),
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          createdAt: new Date(user.createdAt),
        },
      };
      handleStatusUpdate(tweetObject);
    }

  };

  return (
    <div className="whats-happening">
      <Photo />
      <form onSubmit={submit}>
        <textarea
          name="text"
          placeholder="What's happening?"
          minLength={1}
          maxLength={280}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <label htmlFor="authorId">Author</label>
          <input
            type="number"
            id="authorId"
            onChange={(e) => setAuthorId(Number.parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <Toolbar />
          <button type="submit"> Tweet </button>
        </div>
      </form>
    </div>
  );
};

export default WhatsHappening;
