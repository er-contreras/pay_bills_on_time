import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function LoginPage({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('jwt', data.jwt);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Please login first</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Username or Email
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </label>

          <label htmlFor="password">
            Password
            <input type="text" id="password" value={password} onChange={handlePasswordChange} />
          </label>

          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
