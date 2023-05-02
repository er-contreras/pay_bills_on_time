import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

const Table = () => {
  const [bills, setBills] = useState([]);
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
    } else {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = atob(token.split('.')[1]);
      const decodedUserId = JSON.parse(decodedToken);

      const matchingCurrentUser = users.find((user) => user.id === decodedUserId.user_id);
      setCurrentUser(matchingCurrentUser);
    }
  }, [users]);

  useEffect(() => {
    fetch('http://localhost:3000/bills', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((bills) => {
        setBills(bills);
      });
  }, []);

  return (
    <div className="table-content">
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.filter((bill) => bill.user_id === currentUser?.id).map((row) => (
            <tr key={uuidv4()}>
              <td>{row.name}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
