import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/login', { email, password });
      const data = response.data; 
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setError('');
      navigate('/blogs'); 
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred.');
      }
    }
  };

 

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
     
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
          <p>Not a user? <Link to="/register">Sign Up</Link></p>
        </form>
      
       
     
    </div>
  );
};

export default Login;
