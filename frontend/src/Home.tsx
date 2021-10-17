import { FC } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { UserResult } from './lib/ApiResult';

interface State {
  loggedUser: UserResult;
}

const Home: FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';

  const { location } = props;
  let ls;

  if (location.state) {
    ls = location.state as State;
  }

  return (
    localStorage.getItem('token')
      ? (
        <>
          <Link to="/logout">Log out</Link>
          <Navbar />
          <Feed
            apiURL={apiURL}
            loggedUser={ls ? ls.loggedUser : undefined}
          />
          <Sidebar />
        </>
      )
      : <Redirect to="/" />
  );
};

export default Home;
