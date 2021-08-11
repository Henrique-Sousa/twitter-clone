import Text from './Text';
import Author from './Author';
import './Tweet.css';

export default function Tweet(props) {
	return (
		<div className="tweet">
			<Author name={props.authorName} nickName={props.authorNickName} />
			<Text value={props.text} />
		</div>
	);
}

