import { FC } from 'react';
import AuthorName from './AuthorName';
import AuthorUsername from './AuthorUsername';
import getFormatedDate from '../lib/getFormatedDate';

interface Props {
  name: string;
  username: string;
  date: Date;
}

const Author: FC<Props> = (props: Props) => {
  let name: string;
  let username: string;
  let dateDisplayed: string;

  name = props.name;
  username = props.username;
  dateDisplayed = getFormatedDate(props.date, new Date(Date.now()));
  
  return (
    <p className="tweet__author-area">
      <AuthorName value={name} />
      <AuthorUsername value={username} />
      <span style={{ color: 'rgb(83, 100, 113)' }}>{` · ${dateDisplayed}`}</span>
    </p>
  );
};

export default Author; 
