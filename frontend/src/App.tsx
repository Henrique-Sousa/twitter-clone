import { FC } from 'react';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App: FC = () => {

  const apiURL: string = 'http://127.0.0.1:3001';

  return (
    <>
      <Navbar />
      <Feed apiURL={apiURL} />
      <Sidebar />
    </>
  );
}

export default App;
