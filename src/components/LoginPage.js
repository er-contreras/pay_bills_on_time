import '../styles/LoginPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.match(emailRegex)) {
      setError('Please enter a valid email.');
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
    }

    if (email && password) {
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to login');
        })
        .then((data) => {
          localStorage.setItem('token', data.token);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="login-form">
      <h1>Please login first</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-labels">
          <label htmlFor="email">
            Email
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </label>

          <label htmlFor="password">
            Password
            <input type="text" id="password" value={password} onChange={handlePasswordChange} />
          </label>

          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </div>
      </form>

      <Link to="/new">Create Account</Link>
    </div>
  );
};

export default LoginPage;
