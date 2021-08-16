import AuthorName from './AuthorName';
import AuthorNickName from './AuthorNickName';

const Author = ({ nickName, name, date }) => {
  const year = date.getFullYear();
  const currentDate = new Date(Date.now());
  let dateDisplayed;
  let yearDisplayed;
  if (year === currentDate.getFullYear()) {
    yearDisplayed = '';
  } else {
    yearDisplayed = `, ${year}`;
  }
  const day = date.getDate();
  let dayDisplayed;
  if (day === currentDate.getDate()) {
    dayDisplayed = '';
    const hours = date.getHours();
    if (hours === currentDate.getHours()) {
      const minutes = date.getMinutes();
      if (minutes === currentDate.getMinutes()) {
        const seconds = date.getSeconds();
        dateDisplayed = `${currentDate.getSeconds() - seconds}s`;
      } else {
        dateDisplayed = `${currentDate.getMinutes() - minutes}m`;
      }
    } else {
      dateDisplayed = `${currentDate.getHours() - hours}h`;
    }
  } else {
    dayDisplayed = date.getDay();
    const monthDisplayed = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date.getMonth());
    dateDisplayed = `${monthDisplayed} ${dayDisplayed} ${yearDisplayed}`;
  }

  return (
    <p className="tweet__author-area">
      <AuthorNickName value={nickName} />
      <AuthorName value={name} />
      <span>{` ${dateDisplayed}`}</span>
    </p>
  );
};

export default Author;
