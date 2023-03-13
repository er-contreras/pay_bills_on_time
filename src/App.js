import './styles/App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import LoginPage from './components/Login';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header />
      {authenticated ? (
        <Content to="/" />
      ) : (
        <LoginPage setAuthenticated={setAuthenticated} />
      )}
    </>
  );
}

export default App;
