import { FC } from 'react';
import './Photo.css';

interface Props {
  imageSrc: string;
}

const Photo: FC<Props> = ({ imageSrc }) => (
  <div>
    <img
      className="user__photo"
      src={imageSrc}
      alt=""
    />
  </div>
);

export default Photo;
