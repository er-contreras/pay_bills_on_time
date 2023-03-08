import { useState } from 'react';

function Form(props) {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const newData = { task, time };
    const { onAddData } = props;
    onAddData(newData);
    setTask('');
    setTime('');
  }

  return (
    <div className="form-content">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">
          Add Task
          <input type="text" id="task" name="task" value={task} onChange={(event) => setTask(event.target.value)} />
        </label>

        <label htmlFor="time">
          Add Time
          <input type="text" id="time" name="task" value={time} onChange={(event) => setTime((event.target.value))} />
        </label>

        <button type="submit">Add Data</button>
      </form>
    </div>
  );
}

export default Form;
