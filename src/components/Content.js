import '../styles/Content.css';
import { useState } from 'react';
import Form from './Form';
import Table from './Table';

function Content() {
  const [data, setData] = useState([]);

  const handleAddData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <div id="content">
      <Form onAddData={handleAddData} />
      <Table data={data} />
    </div>
  );
}

export default Content;
