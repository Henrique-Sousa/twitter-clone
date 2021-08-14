import Text from './Text';
import Author from './Author';
import './Tweet.css';

const Tweet = ({ authorName, authorNickName, text }) => (
  <div className="tweet">
    <Author name={authorName} nickName={authorNickName} />
    <Text value={text} />
  </div>
);

export default Tweet;
