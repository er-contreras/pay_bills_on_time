import '../styles/Content.css';
import { useEffect, useState } from 'react';
import LogOut from './LogOut';
import FetchUser from './FetchUser';

const CurrentUser = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  FetchUser({ setUsers });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = atob(token.split('.')[1]);
      const decodedUserId = JSON.parse(decodedToken);

      const validateCurrentUser = users.find((user) => user.id === decodedUserId.user_id);
      setCurrentUser(validateCurrentUser);
    }
  }, [users]);

  return (
    <div className="user-info">
      {currentUser ? (
        <div>
          <h2>
            Welcome,
            {' '}
            {
              currentUser.name
            }
            !
          </h2>
          <p>
            {currentUser.email}
          </p>
        </div>
      ) : (
        <h2>Please login first</h2>
      )}

      <LogOut />
    </div>
  );
};

export default CurrentUser;
