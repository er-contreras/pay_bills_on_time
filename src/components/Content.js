import '../styles/Content.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BillForm from './BillForm';
import Table from './Table';
import Header from './Header';

const Content = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  const handleBillAdded = (newBill) => {
    setBills([...bills, newBill]);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      fetch(`http://localhost:3000/user_bills/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => response.json())
        .then((bills) => {
          setBills(bills);
        });
    } else {
      navigate('/login');
    }
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
      <Header />
      <BillForm onBillAdded={handleBillAdded} />
      <Table bills={bills} handleDelete={handleDelete} />
    </div>
  );
};

export default Content;
