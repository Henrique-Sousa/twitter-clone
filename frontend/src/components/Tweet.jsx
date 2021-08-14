import Text from './Text';
import Author from './Author';
import './Tweet.css';

const Tweet = (props) => (
  <div className="tweet">
    <Author name={props.authorName} nickName={props.authorNickName} />
    <Text value={props.text} />
  </div>
);

export default Tweet;
