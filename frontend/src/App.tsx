import { FC } from 'react';
import { Link, Redirect } from 'react-router-dom';

const App: FC = () => (
  localStorage.getItem('token')
    ? <Redirect to="/home" />
    : (
      <>
        <ul>
          <li><Link to="/login">Log in</Link></li>
          <li><Link to="/signup">Join</Link></li>
        </ul>
      </>
    )
);

export default App;
