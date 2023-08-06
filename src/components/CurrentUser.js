import '../styles/Content.css';
import { useEffect, useState } from 'react';
import LogOut from './LogOut';

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    if (user) {
      setCurrentUser(parsedUser);
    }
  }, []);

  return (
    <div className="user-info">
      {currentUser ? (
        <div>
          <h2>
            Welcome,
            {' '}
            {currentUser.name}
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
