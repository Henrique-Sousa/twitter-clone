import {
  FC, useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import fetchJSON from './lib/fetchJSON';
import { UserResult } from './lib/ApiResult';

const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';

type Props = RouteComponentProps<{ username: string }>;

const UserPage: FC<Props> = ({ match }) => {

  const [name, setName]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
  const [username, setUsername]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const userResult: UserResult = await fetchJSON(`${apiURL}/users/by/username/${match.params.username}`);
        setName(userResult.name);
        setUsername(userResult.username);
      } catch (e) {
        // ...
      }
    })();
  }, []);

  return (
    <div>
      <h1>
        Name:
        {` ${name}`}
      </h1>
      <p>
        Username:
        {` ${username}`}
      </p>
    </div>
  );
};

export default UserPage;
