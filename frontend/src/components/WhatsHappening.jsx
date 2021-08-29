import React, { useState } from 'react';
import Toolbar from './Toolbar';
import Photo from './Photo';
import './WhatsHappening.css';

const WhatsHappening = ({ apiURL, setState }) => {
  const [author, setAuthor] = useState(-1);
  const [text, setText] = useState('');

  const submit = async (event) => {
    event.preventDefault();

    const tweet = { author, text };

    if (tweet.text !== '' && tweet.author >= 0) {
      await fetch(`${apiURL}/tweets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweet),
      });
    }
    setState(tweet);
  };

  return (
    <div className="whats-happening">
      <Photo />
      <form onSubmit={submit}>
        <textarea
          name="text"
          placeholder="What's happening?"
          minLength="1"
          maxLength="280"
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="number"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
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
