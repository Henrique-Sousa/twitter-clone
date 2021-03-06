// get date of a tweet and return formated date to be displayed
// if tweet year is not current year, show full date eg. May 17, 2020
// if tweet year is current year but tweet day is not current day, show month day: Aug 24
// if tweet day is current day, but tweet hour is not current hour, show hours passed: 10h
// if tweet hour is current hour but tweet minute is not current minute, show minutes passed: 9m
// if tweet minute is current minute, show seconds passed

const getFormatedDate = (tweetDate: Date, currentDate: Date): string => {
  const delta = (currentDate.getTime() - tweetDate.getTime()) / 1000;
  const m = 60;
  const h = 60 * m;
  const d = 24 * h;
  const tweetYear = tweetDate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const tweetMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(tweetDate);
  const tweetDay = tweetDate.getDate();

  if (delta < m) {
    return `${Math.floor(delta)}s`;
  }
  if (delta < h) {
    return `${Math.floor(delta / m)}m`;
  }
  if (delta < d) {
    return `${Math.floor(delta / h)}h`;
  }
  if (tweetYear === currentYear) {
    return `${tweetMonth} ${tweetDay}`;
  }
  return `${tweetMonth} ${tweetDay}, ${tweetYear}`;
};

export default getFormatedDate;
