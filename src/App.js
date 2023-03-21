import './styles/App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import LoginPage from './components/LoginPage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  // const [user, setUser] = useState(false);

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     setAuthenticated(true);
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('http://localhost:3000/auth/login', {
        headers: { Authenticate: localStorage.token },
      })
        .then((response) => response.json())
        .then((user) => {
          setAuthenticated(user);
        });
    }
  }, []);

  return (
    <>
      <Header />
      {authenticated ? <Content /> : <LoginPage setAuthenticated={setAuthenticated} /> }
    </>
  );
}

export default App;
