import './Text.css';

const Text: React.FC<{ value: string }> = ({ value }) => (
  <p className="tweet__text">{value}</p>
);

export default Text;
