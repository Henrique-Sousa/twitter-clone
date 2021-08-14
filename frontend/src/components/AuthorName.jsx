import './AuthorName.css';

const AuthorName = ({ value }) => (
  <span className="tweet__author-name">
    {` @${value}`}
  </span>
);

export default AuthorName;
