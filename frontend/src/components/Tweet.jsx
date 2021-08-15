import Text from './Text';
import Author from './Author';
import './Tweet.css';

const Tweet = ({ authorName, authorNickName, text }) => (
  <article className="tweet">
    <Author name={authorName} nickName={authorNickName} />
    <Text value={text} />
  </article>
);

export default Tweet;
