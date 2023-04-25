import { v4 as uuidv4 } from 'uuid';

function Table(arg) {
  const { data } = arg;
  return (
    <div className="table-content">
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Bill</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={uuidv4()}>
              <td>{row.bill}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
