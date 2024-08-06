import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { authToken, userRole } = useAuth();

  console.log('AuthToken:', authToken);
  console.log('UserRole:', userRole);

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/add-book">Add Book</Link></li>
        {userRole === 'ROLE_ADMIN' && (
          <li><Link to="/add-genre">Add Genre</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
