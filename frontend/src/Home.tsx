import { FC } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Home: FC = () => {

  const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';

  return (
    localStorage.getItem('token')
      ? (
        <>
          <Link to="/logout">Log out</Link>
          <Navbar />
          <Feed apiURL={apiURL} />
          <Sidebar />
        </>
      )
      : <Redirect to="/" />
  );
};

export default Home;
