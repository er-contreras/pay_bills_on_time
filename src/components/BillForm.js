import { useState } from 'react';

function BillForm(arg) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const { onAddData } = arg;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/bills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bill: { name, date },
      }),
    });

    const newData = { name, date };
    onAddData(newData);
    setName('');
    setDate('');
  };

  return (
    <div className="task-form-content">
      <form className="task-form-content" onSubmit={handleSubmit}>
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
