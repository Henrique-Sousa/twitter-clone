import Text from './Text';
import Author from './Author';
import Photo from './Photo';
import './Tweet.css';

interface Props {
  name: string;
  username: string;
  date: Date;
  text: string;
}

const Tweet: React.FC<Props> = ({
  name,
  username,
  date,
  text,
}) => (
  <article className="tweet">
    <Photo />
    <div>
      <Author name={name} username={username} date={date} />
      <Text value={text} />
    </div>
  </article>
);

export default Tweet;
