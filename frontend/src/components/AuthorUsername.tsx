import { FC } from 'react';
import './AuthorUsername.css';

const AuthorUsername: FC<{ value: string }> = ({ value }) => (
  <span className="tweet__author-username">
    {` @${value}`}
  </span>
);

export default AuthorUsername;
