import {
  FC,
} from 'react';
import { UserResult } from '../lib/ApiResult';
import Photo from './Photo';
import './UserProfile.css';

interface Props {
  user?: UserResult;
  loggedUser?: UserResult;
}

const UserProfile: FC<Props> = ({ user, loggedUser }: Props) => (
  <div className="user-profile">
    <div style={{ height: 200, background: 'black' }} />
    <h1 style={{ marginTop: 40, lineHeight: 1 }}>{user?.name === loggedUser?.name ? 'You' : user?.name}</h1>
    <div style={{
      marginLeft: 15,
      marginTop: -5,
      lineHeight: 0,
      marginBottom: 20,
    }}
    >
      <span style={{ fontSize: 15, color: 'gray' }}>{`@${user?.username}`}</span>
    </div>
    <Photo imageSrc={user?.photoUrl} />
  </div>
);

UserProfile.defaultProps = {
  user: undefined,
  loggedUser: undefined,
};

export default UserProfile;
