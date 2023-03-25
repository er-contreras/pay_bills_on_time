import './styles/App.css';
// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import LoginPage from './components/LoginPage';
import CreateUser from './components/CreateUser';

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  // const [user, setUser] = useState(false);

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     setAuthenticated(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     fetch('http://localhost:3000/auth/login', {
  //       headers: { Authenticate: localStorage.token },
  //     })
  //       .then((response) => response.json())
  //       .then((user) => {
  //         setAuthenticated(user);
  //       });
  //   }
  // }, []);

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
