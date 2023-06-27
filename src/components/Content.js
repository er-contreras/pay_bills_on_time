import '../styles/Content.css';
import BillForm from './BillForm';
import Table from './Table';
import CurrentUser from './CurrentUser';

const Content = () => (
  <div id="content">
    <CurrentUser />
    <BillForm />
    <Table />
  </div>
);

export default Content;
