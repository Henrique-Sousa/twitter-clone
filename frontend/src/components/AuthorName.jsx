import './AuthorName.css';

const AuthorName = (props) => (
  <span className="tweet__author-name">
    {` @${props.value}`}
  </span>
);

export default AuthorName;
