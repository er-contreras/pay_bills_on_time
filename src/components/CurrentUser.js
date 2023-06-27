import '../styles/Content.css';
import { useEffect, useState } from 'react';
import LogOut from './LogOut';

const CurrentUser = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => response.json())
        .then((users) => {
          setUsers(users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
            Email:
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
