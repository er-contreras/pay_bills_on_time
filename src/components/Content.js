import '../styles/Content.css';
import { useState } from 'react';
import TaskForm from './TaskForm';
import Table from './Table';

function Content() {
  const [data, setData] = useState([]);

  const handleAddData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <div id="content">
      <TaskForm onAddData={handleAddData} />
      <Table data={data} />
    </div>
  );
}

export default Content;
