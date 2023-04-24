import '../styles/Content.css';
import { useState } from 'react';
import TaskForm from './TaskForm';
import Table from './Table';
import LogOut from './LogOut';

function Content() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  if (localStorage.getItem('token')) {
    const getUsers = () => {
      fetch('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }; // Empty dependency array to run only once on mount

    getUsers();

    const currentUser = () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = atob(token.split('.')[1]);
        const decodedUserId = JSON.parse(decodedToken);

        const currentUser = data.find((user) => user.id === decodedUserId.user_id);
        setUser(currentUser);
      }
    }; // Dependency on data to run whenever data changes

    currentUser();
  } else {
    window.location.href = '/login';
  }

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
      {user ? (
        <div>
          <h2>
            Welcome,
            {' '}
            {
              user.name
            }
            !
          </h2>
          <p>
            Email:
            {user.email}
          </p>
        </div>
      ) : (
        <h2>Please login first</h2>
      )}

      <LogOut />

      <TaskForm onAddData={handleAddData} />
      <Table data={data} />
    </div>
  );
}

export default Content;
