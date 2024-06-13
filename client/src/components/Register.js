import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
   
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return re.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/register', { name, email, password });
      console.log(response, "response")
      alert('Registration successful');

      setName('');
      setEmail('');
      setPassword('');
      setError('');
      navigate('/'); 

    } catch (error) {
      console.log("error----", error)
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div>
      <h2 className="register-heading">Register</h2>
      <div className="register-container">
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">Register</button>
          <p>Already a user? <Link to="/">Login</Link></p> 
        </form>
      </div>
    </div>
  );
};

export default Register;
