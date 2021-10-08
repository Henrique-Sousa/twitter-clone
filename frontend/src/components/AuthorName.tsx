import { FC } from 'react';
import './AuthorName.css';

const AuthorName: FC<{value: string}> = ({ value }) => (
  <span className="tweet__author-name">{value}</span>
);

export default AuthorName;
