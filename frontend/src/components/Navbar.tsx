import { Link } from 'react-router-dom';
import TwitterLogo from './icons/TwitterLogo';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div>
      <div className="twitter__logo">
        <TwitterLogo />
      </div>
      <Link to="/logout">Log out</Link>
    </div>
  </nav>
);

export default Navbar;
