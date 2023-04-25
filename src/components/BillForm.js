import { useEffect, useState } from 'react';

function BillForm(arg) {
  const [bill, setBill] = useState('');
  const [date, setDate] = useState('');

  const { onAddData } = arg;

  function handleSubmit(event) {
    event.preventDefault();

    const newData = { bill, date };
    onAddData(newData);
    setBill('');
    setDate('');
  }

  useEffect(() => {
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: { bill, date },
      }),
    });
  }, [bill, date]);

  return (
    <div className="task-form-content">
      <form className="task-form-content" onSubmit={handleSubmit}>
        <label htmlFor="bill">
          Add Bill
          <input type="text" id="bill" name="bill" value={bill} onChange={(event) => setBill(event.target.value)} />
        </label>

        <label htmlFor="date">
          Add Date
          <input type="text" id="time" name="date" value={date} onChange={(event) => setDate((event.target.value))} />
        </label>

        <button type="submit">Add Data</button>
      </form>
    </div>
  );
}

export default BillForm;
