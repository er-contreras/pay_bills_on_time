import { useState } from 'react';

function CreateUser() {
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

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h1>Create new user</h1>
      <form className="new-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </label>

          <label htmlFor="password">
            Password
            <input type="text" id="password" value={password} onChange={handlePasswordChange} />
          </label>

          <button type="submit">Create new user</button>
        </div>
      </form>
    </>
  );
}

export default CreateUser;
