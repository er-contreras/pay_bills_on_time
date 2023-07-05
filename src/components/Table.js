import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaBell } from 'react-icons/fa';
import PropTypes from 'prop-types';
import FetchUser from './FetchUser';

const Table = (props) => {
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
          {bills.filter((bill) => bill.user_id === currentUser?.id).map((row) => (
            <tr key={uuidv4()}>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td className="tableButtons">
                <button type="submit" onClick={() => handleDelete(row.id)} aria-label="Delete"><FaTrash /></button>
                <button type="button" onClick={() => navigate(`/bills/${row.id}/edit`)} aria-label="Edit"><FaEdit /></button>
                <button type="button" aria-label="Notification"><FaBell /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  bills: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.number,
      name: PropTypes.string,
      date: PropTypes.string,
    }),
  ),
  handleDelete: PropTypes.func.isRequired,
};

Table.defaultProps = {
  bills: [],
};

export default Table;
