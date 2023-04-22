import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
