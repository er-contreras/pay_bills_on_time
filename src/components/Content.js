import '../styles/Content.css';
import { useEffect, useState } from 'react';
import BillForm from './BillForm';
import Table from './Table';
import LogOut from './LogOut';

const Content = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => response.json())
        .then((users) => {
          setUsers(users);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = atob(token.split('.')[1]);
      const decodedUserId = JSON.parse(decodedToken);

      const validateCurrentUser = users.find((user) => user.id === decodedUserId.user_id);
      setCurrentUser(validateCurrentUser);
    }
  }, [users]); // Dependency on data to run whenever data changes

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error.message}
      </div>
    );
  }

  return (
    <div id="content">
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

      <BillForm />
      <Table />
    </div>
  );
};

export default Content;
