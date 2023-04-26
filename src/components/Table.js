import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

const Table = () => {
  const [bills, setBills] = useState([]);

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
          {bills.map((row) => (
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
