import React, { useState, Dispatch, SetStateAction } from 'react';
import Toolbar from './Toolbar';
import Photo from './Photo';
import './WhatsHappening.css';
import Feed from './Feed';
import { TweetResult } from '../../../shared/ApiResults';

interface Props {
  apiURL: string;
  // setState: (tweet: { text: string, authorId: number }) => void;
}
 
const WhatsHappening: React.FC<Props> = ({ 
  apiURL, 
  // setState 
}) => {

  let authorId: number;
  let setAuthorId: Dispatch<SetStateAction<number>>;
  let text: string;
  let setText: Dispatch<SetStateAction<string>>;

  [authorId, setAuthorId] = useState<number>(-1);
  [text, setText] = useState<string>('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tweet = { authorId, text };

    if (tweet.text !== '' && tweet.authorId >= 0) {
      await fetch(`${apiURL}/tweets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweet),
      });
      window.location.reload();
    }

    // setState(tweet);
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
            onChange={(e) => setAuthorId(Number.parseInt(e.target.value))}
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
