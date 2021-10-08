import { FC } from 'react';
import './Text.css';

const Text: FC<{ value: string }> = ({ value }) => (
  <p className="tweet__text">{value}</p>
);

export default Text;
