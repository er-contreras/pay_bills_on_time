import { useState } from 'react';
import { Link } from 'react-router-dom';

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
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Please login first</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </label>

          <label htmlFor="password">
            Password
            <input type="text" id="password" value={password} onChange={handlePasswordChange} />
          </label>

          <button type="submit">Login</button>
        </div>
      </form>

      <Link to="/new">Create Account</Link>
    </div>
  );
}

export default LoginPage;
