import AuthorName from './AuthorName';
import AuthorNickName from './AuthorNickName';
import getFormatedDate from '../lib/getFormatedDate';

const Author = ({ nickName, name, date }) => {
  const currentDate = new Date(Date.now());
  const dateDisplayed = getFormatedDate(date, currentDate);

  return (
    <p className="tweet__author-area">
      <AuthorNickName value={nickName} />
      <AuthorName value={name} />
      <span style={{ color: 'rgb(83, 100, 113)' }}>{` · ${dateDisplayed}`}</span>
    </p>
  );
};

export default Author;
