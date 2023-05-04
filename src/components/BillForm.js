import '../styles/BillForm.css';
import { useEffect, useState } from 'react';

function BillForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = atob(token.split('.')[1]);
      const decodedUserId = JSON.parse(decodedToken);

      setCurrentUser(decodedUserId.user_id);
    }
  }, [currentUser]); // Dependency on data to run whenever data changes

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

        <button type="submit">Add Data</button>
      </form>
    </div>
  );
}

export default BillForm;
