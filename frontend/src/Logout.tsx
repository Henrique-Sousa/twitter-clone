import { FC } from 'react';
import { Redirect } from 'react-router-dom';

const Logout: FC = () => {

  localStorage.clear();

  return <Redirect to="/" />;

};

export default Logout;
