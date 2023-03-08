import { v4 as uuidv4 } from 'uuid';

function Table(arg) {
  const { data } = arg;
  return (
    <div className="table-content">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={uuidv4()}>
              <td>{row.task}</td>
              <td>{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
