import '../styles/BillForm.css';
import { useState } from 'react';
import HandleExpiredToken from './expired_token';

const getToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = atob(token.split('.')[1]);
    const decodedUserId = JSON.parse(decodedToken);
    return decodedUserId.user_id;
  }
  return null;
};

const BillForm = () => {
  HandleExpiredToken();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const currentUser = getToken();

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setDate(value);
  };

  const handleSubmit = () => {
    fetch('http://localhost:3000/bills', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bill: { name, date, user_id: currentUser },
      }),
    }).then((response) => response.json())
      .then((bills) => {
        console.log(bills);
      })
      .catch((error) => {
        console.log(error);
      });

    setName('');
    setDate('');
  };

  return (
    <div className="task-form-content">
      <form onSubmit={handleSubmit}>
        <label htmlFor="bill">
          Add Bill
          <input type="text" id="bill" name="bill" value={name} onChange={handleNameChange} />
        </label>

        <label htmlFor="date">
          Add Date
          <input type="text" id="date" name="date" value={date} onChange={handleDateChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BillForm;
