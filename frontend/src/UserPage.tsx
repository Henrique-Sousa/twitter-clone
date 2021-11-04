import {
  FC, useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import fetchJSON from './lib/fetchJSON';
import { UserResult } from './lib/ApiResult';
import UserPageMain from './components/UserPageMain';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

type Props = RouteComponentProps<{ username: string }>;

const UserPage: FC<Props> = ({ match }) => {

  const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';

  const userJson = localStorage.getItem('loggedUser');

  let loggedUser;
  if (userJson) {
    loggedUser = JSON.parse(userJson);
  }

  type MaybeUserResult = UserResult | undefined;
  type userResultState = [MaybeUserResult, Dispatch<SetStateAction<MaybeUserResult>>];
  const [user, setUser]: userResultState = useState<MaybeUserResult>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const userResult: UserResult = await fetchJSON(`${apiURL}/users/by/username/${match.params.username}`);
        if (!('error' in userResult)) {
          setUser(userResult);
        }
      } catch (e) {
        // ...
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <UserPageMain
        apiURL={apiURL}
        loggedUser={loggedUser || undefined}
        user={user}
      />
      <Sidebar />
    </>
  );
};

export default UserPage;
