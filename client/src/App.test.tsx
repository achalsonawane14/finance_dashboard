import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleMode = () => {
    setIsRegister(prev => !prev);
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister ? { name, email, password } : { email, password };

      const res = await axios.post(`http://localhost:5000${endpoint}`, payload);

      if (!isRegister) {
        localStorage.setItem('token', res.data.token);
        alert('Login successful');
        window.location.href = '/dashboard';
      } else {
        alert('Registration successful! Please log in.');
        setIsRegister(false);
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <div className="auth-form">
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="auth-input"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="auth-input"
        />

        <button className="auth-button" onClick={handleSubmit}>
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p className="auth-toggle">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="toggle-link" onClick={toggleMode}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;