import './AuthorUsername.css';

const AuthorUsername: React.FC<{ value: string }> = ({ value }) => (
  <span className="tweet__author-username">
    {` @${value}`}
  </span>
);

export default AuthorUsername;
