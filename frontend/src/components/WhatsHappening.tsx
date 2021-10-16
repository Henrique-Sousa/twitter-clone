import {
  FC, useState, Dispatch, SetStateAction, FormEvent,
} from 'react';
import Toolbar from './Toolbar';
import Photo from './Photo';
import './WhatsHappening.css';
import { TweetObject } from './Objects';

interface Props {
  apiURL: string;
  handleStatusUpdate: (tweet: TweetObject) => void;
}

const WhatsHappening: FC<Props> = ({
  apiURL,
  handleStatusUpdate,
}) => {

  const [text, setText]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (text !== '' && token) {
      try {
        const response = await fetch(`${apiURL}/tweets`, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ text }),
        });

        const result = await response.json();

        const tweetObject: TweetObject = {
          id: result.id,
          text,
          createdAt: new Date(result.createdAt),
          user: {
            id: result.user.id,
            name: result.user.name,
            username: result.user.username,
            createdAt: new Date(result.user.createdAt),
          },
        };
        handleStatusUpdate(tweetObject);
      } catch (e) {
        // ...
      }
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
          <Toolbar />
          <button type="submit"> Tweet </button>
        </div>
      </form>
    </div>
  );
};

export default WhatsHappening;
