import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <button type="button" onClick={handleLogOut}>Sign Out</button>
    </div>
  );
};

export default LogOut;
