// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  // Function to load user data if a token exists
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the token in axios headers for all future requests
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        // Here you would typically fetch user data
        // For now, we'll just validate the token's existence
        const res = await axios.get('/api/auth');

        setAuth({
          token: token,
          isAuthenticated: true,
          loading: false,
          user: res.data, // Use the real user data from the API
        });
      } catch (err) {
        // If token is invalid
        localStorage.removeItem('token');
        setAuth({
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        });
      }
    } else {
      setAuth({ ...auth, loading: false, isAuthenticated: false });
    }
  };

  // useEffect to run loadUser when the component mounts
  useEffect(() => {
    loadUser();
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token);
    loadUser(); // Reload user data after login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };