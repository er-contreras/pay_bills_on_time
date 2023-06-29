import '../styles/Content.css';
import { useEffect, useState } from 'react';
import BillForm from './BillForm';
import Table from './Table';
import CurrentUser from './CurrentUser';

const Content = () => {
  const [bills, setBills] = useState([]);

  const handleBillAdded = (newBill) => {
    setBills([...bills, newBill]);
  };

  useEffect(() => {
    fetch('http://localhost:3000/bills', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((bills) => {
        setBills(bills);
      });
  }, []);

  const handleDelete = async (billId) => {
    try {
      const response = await fetch(`http://localhost:3000/bills/${billId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.ok) {
        setBills((prevBills) => prevBills.filter((bill) => bill.id !== billId));
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="content">
      <CurrentUser />
      <BillForm onBillAdded={handleBillAdded} />
      <Table bills={bills} handleDelete={handleDelete} />
    </div>
  );
};

export default Content;
