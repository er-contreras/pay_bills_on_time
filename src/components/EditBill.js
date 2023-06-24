import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const EditBill = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/bills/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bill: { name, date },
      }),
    })
      .then((response) => response.json())
      .then((bill) => {
        console.log(bill);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Edit Bill</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </label>

        <label htmlFor="date">
          Date
          <input type="text" id="date" value={date} onChange={handleDateChange} />
        </label>

        <button type="submit">Submit</button>
      </form>

      <Link to="/">Back to Bills</Link>
    </div>
  );
};

export default EditBill;
