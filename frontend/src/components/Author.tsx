import { FC } from 'react';
import { Link } from 'react-router-dom';
import AuthorName from './AuthorName';
import AuthorUsername from './AuthorUsername';
import getFormatedDate from '../lib/getFormatedDate';
import './Author.css';

interface Props {
  name: string;
  username: string;
  date: Date;
}

const Author: FC<Props> = ({ name, username, date }: Props) => {

  const dateDisplayed: string = getFormatedDate(date, new Date(Date.now()));

  return (
    <p className="tweet__author-area">
      <Link to={`/${username}`} className="tweet__userlink">
        <AuthorName value={name} />
        <AuthorUsername value={username} />
      </Link>
      <span style={{ color: 'rgb(83, 100, 113)' }}>{` · ${dateDisplayed}`}</span>
    </p>
  );
};

export default Author;
