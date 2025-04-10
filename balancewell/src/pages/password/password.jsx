import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Password.css';

const Password = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const correctUsername = 'admin';
  const correctPassword = 'te10';

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      setError('');
      navigate('/home');
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Please enter username and password</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Password;
