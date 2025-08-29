import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import API from '../api';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      // The 'login' function from our context handles saving the token and reloading
      login(res.data.token);
    } catch (err) {
      console.error(err.response.data);
      toast.error(`Login Failed: ${err.response.data.msg || 'Server Error'}`);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Login</h2>
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
        <input type="submit" value="Login" />
      </form>
      {/* This link allows users to navigate to the registration page */}
      <p className="auth-switch-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;