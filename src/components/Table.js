import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaBell } from 'react-icons/fa';
import FetchUser from './FetchUser';

const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const { bills, handleDelete } = props;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  FetchUser({ setUsers });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = atob(token.split('.')[1]);
      const decodedUserId = JSON.parse(decodedToken);

      const matchingCurrentUser = users.find((user) => user.id === decodedUserId.user_id);
      setCurrentUser(matchingCurrentUser);
    }
  }, [users]);

  return (
    <div className="table-content">
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line react/prop-types */}
          {bills.filter((bill) => bill.user_id === currentUser?.id).map((row) => (
            <tr key={uuidv4()}>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td className="tableButtons">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="submit" onClick={() => handleDelete(row.id)}><FaTrash /></button>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="button" onClick={() => navigate(`/bills/${row.id}/edit`)}><FaEdit /></button>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="button"><FaBell /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
