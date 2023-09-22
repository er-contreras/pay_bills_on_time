import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaBell } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Table = (props) => {
  const { bills, handleDelete } = props;
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
  const [notificationStatus, setNotificationStatus] = useState('');

  const handleNotification = (name, id, date) => {
    fetch('http://localhost:3000/bill_notification', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bill_notification_data: {
          name, id, date, userEmail,
        },
      }),
    }).then((response) => response.json())
      .then((successNotification) => {
        setNotificationStatus(successNotification.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNotificationStatus('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [notificationStatus]);

  return (
    <div className="table-content">
      <div className="notification-status">{notificationStatus}</div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={uuidv4()}>
              <td>{bill.name}</td>
              <td>{bill.date}</td>
              <td className="tableButtons">
                <button className="delete-button" type="submit" onClick={() => handleDelete(bill.id)} aria-label="Delete"><FaTrash /></button>
                <button className="edit-button" type="button" onClick={() => navigate(`/bills/${bill.id}/edit`)} aria-label="Edit"><FaEdit /></button>
                <button className="noti-button" type="button" onClick={() => handleNotification(bill.name, bill.id, bill.date)} aria-label="Notification"><FaBell /></button>
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
