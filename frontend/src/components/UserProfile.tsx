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
    <div className="pl16" style={{ marginBottom: 16 }}>
      <h1 style={{ paddingLeft: 0, marginTop: 40, lineHeight: 1 }}>{user?.name === loggedUser?.name ? 'You' : user?.name}</h1>
      <div style={{
        marginTop: -5,
        lineHeight: 0,
        marginBottom: 20,
      }}
      >
        <span style={{ fontSize: 15, color: 'gray' }}>{`@${user?.username}`}</span>
      </div>
      <Photo imageSrc={user?.photoUrl} />
      <div>
        <p style={{ fontSize: 15 }}> User description goes here </p>
      </div>
    </div>
  </div>
);

UserProfile.defaultProps = {
  user: undefined,
  loggedUser: undefined,
};

export default UserProfile;
