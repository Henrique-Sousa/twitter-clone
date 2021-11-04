import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import HomeMain from './components/HomeMain';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Home: FC = () => {

  const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('loggedUser');

  let loggedUser;
  if (userJson) {
    loggedUser = JSON.parse(userJson);
  }

  return (
    token ? (
      <>
        <Navbar />
        <HomeMain
          apiURL={apiURL}
          loggedUser={loggedUser || undefined}
        />
        <Sidebar />
      </>
    )
      : <Redirect to="/" />
  );
};

export default Home;
