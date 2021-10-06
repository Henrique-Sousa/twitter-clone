import './AuthorName.css';

const AuthorName: React.FC<{value: string}> = ({ value }) => (
  <span className="tweet__author-name">{value}</span>
);

export default AuthorName;
