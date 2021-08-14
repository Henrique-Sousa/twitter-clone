import AuthorName from './AuthorName';
import AuthorNickName from './AuthorNickName';

export default function Author(props) {
  return (
    <p className="tweet__author-area">
      <AuthorNickName value={props.nickName} />
      <AuthorName value={props.name} />
    </p>
  );
}
