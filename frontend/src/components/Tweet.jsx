import Text from './Text';
import Author from './Author';
import Photo from './Photo';
import './Tweet.css';

const Tweet = ({
  authorName,
  authorNickName,
  date,
  text,
}) => (
  <article className="tweet">
    <Photo />
    <div>
      <Author name={authorName} nickName={authorNickName} date={date} />
      <Text value={text} />
    </div>
  </article>
);

export default Tweet;
