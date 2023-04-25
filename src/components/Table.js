import { v4 as uuidv4 } from 'uuid';

function Table(arg) {
  const { users } = arg;
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
          {users.map((row) => (
            <tr key={uuidv4()}>
              <td>{row.name}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
