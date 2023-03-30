import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import LoginPage from './components/LoginPage';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Content />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new" element={<CreateUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
