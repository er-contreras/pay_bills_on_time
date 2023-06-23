import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HandleExpiredToken = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!token) {
        navigate('/login');
      } else if (token) {
        const decodedToken = decodeToken(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
    };

    checkTokenExpiration();
  }, [token, navigate]);
};

export default HandleExpiredToken;
