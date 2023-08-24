import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    if (user) {
      setCurrentUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Pay bills on time</h1>
      <div className="user-info">
        {currentUser && (
          <div className="current-user">
            Welcome
            {' '}
            {currentUser.username}
            !
            {' '}
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
