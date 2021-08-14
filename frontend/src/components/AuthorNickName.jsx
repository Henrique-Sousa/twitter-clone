import './AuthorNickName.css';

export default function AuthorNickName(props) {
  return <span className="tweet__author-nickname">{props.value}</span>;
}
