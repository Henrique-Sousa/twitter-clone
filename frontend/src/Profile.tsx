import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import fetchJSON from './lib/fetchJSON'; 
import { UserResult } from './lib/ApiResult';

const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';

type Props = RouteComponentProps<{ username: string }>;

const Profile: FC<Props> = ({ match }) => {

  let name: string;
  let setName: Dispatch<SetStateAction<string>>;
  let username: string;
  let setUsername: Dispatch<SetStateAction<string>>;

  [name, setName] = useState<string>('');
  [username, setUsername] = useState<string>('');

  useEffect(() => {
    (async () => {
      const userResult: UserResult = await fetchJSON(`${apiURL}/users/by/username/${match.params.username}`);
      setName(userResult.name);
      setUsername(userResult.username);
    })();
  }, []);

  return (
    <div>
      <h1>Hello {name}</h1>
      <p>Your username is {username}</p>
    </div>
  );
};

export default Profile;
