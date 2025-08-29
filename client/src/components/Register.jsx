import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Import Link
import axios from 'axios';
import { toast } from 'react-toastify';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, password };
      await axios.post('/api/auth/register', newUser);

      
      
      navigate('/login');
      toast.success('Registration Successful! Please log in.');

    } catch (err) {
      console.error(err.response.data);
      toast.error(`Registration Failed: ${err.response.data.msg || 'Server Error'}`);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={onSubmit}>
        <h2>Register</h2>
        <div>
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={onChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email} 
            onChange={onChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={password} 
            onChange={onChange} 
            minLength="6" 
            required 
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      {/* 2. This link allows users to navigate back to the login page */}
      <p className="auth-switch-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;