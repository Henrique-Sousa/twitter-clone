import Text from './Text';
import Author from './Author';
import './Tweet.css';

const Tweet = ({
  authorName,
  authorNickName,
  date,
  text,
}) => (
  <article className="tweet">
    <Author name={authorName} nickName={authorNickName} date={date} />
    <Text value={text} />
  </article>
);

export default Tweet;
