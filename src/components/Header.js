import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Pay bills on time</h1>
      <div className="user-info">
        <button type="button" onClick={handleLogout}>Sign Out</button>
      </div>
    </header>
  );
};

export default Header;
