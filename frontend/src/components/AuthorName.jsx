import './AuthorName.css';

export default function AuthorName(props) {
	return <span className="tweet__author-name"> @{props.value}</span>;
}

