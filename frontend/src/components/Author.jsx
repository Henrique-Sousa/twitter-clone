import AuthorName from './AuthorName';
import AuthorNickName from './AuthorNickName';

const Author = ({ nickName, name }) => (
  <p className="tweet__author-area">
    <AuthorNickName value={nickName} />
    <AuthorName value={name} />
  </p>
);

export default Author;
