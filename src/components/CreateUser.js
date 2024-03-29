import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CreateUser.css';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            username,
            email,
            password,
          },
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-user">
      <h1>Create new user</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </label>

        <label htmlFor="username">
          Username
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </label>

        <label htmlFor="password">
          Password
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </label>

        <button type="submit">Create new user</button>
      </form>
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default CreateUser;
