import AuthorName from './AuthorName';
import AuthorNickName from './AuthorNickName';

const Author = (props) => (
  <p className="tweet__author-area">
    <AuthorNickName value={props.nickName} />
    <AuthorName value={props.name} />
  </p>
);

export default Author;
