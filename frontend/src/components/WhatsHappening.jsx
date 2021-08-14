import { useState } from 'react';
import './WhatsHappening.css';

export default function WhatsHappening(props) {
  const [author, setAuthor] = useState(-1);
  const [text, setText] = useState('');

  const submit = async event => {
    event.preventDefault();

    const tweet = { author, text };

    if (tweet.text !== '' && tweet.author >= 0) {
      await fetch(`${props.apiURL}/tweets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweet),
      });
    }
  }

  return (
    <form onSubmit={submit}> 
      <textarea
        name="text"
        placeholder="What's happening?"
        minLength="1"
        maxLength="280"
        onChange={e => setText(e.target.value)}
      />
      <div>
        <label htmlFor="author">Author</label>
        <input 
          type="number"
          name="author"
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit"> Tweet </button>
    </form>
  );
}
