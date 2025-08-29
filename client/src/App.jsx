import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthContext.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './components/Profile.jsx';
import './App.css';

function App() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <header className="app-header">
        <Link to="/" className="app-branding">
          <div className="logo-icon">
            <span>TI</span>
          </div>
          <h1 className="app-title">TrackIt</h1>
        </Link>
        {isAuthenticated && user && (
          <div className="user-nav">
            {/* This is the dynamic profile icon */}
            <Link to="/profile" className="profile-icon" title="Profile">
              {user.profilePhotoUrl ? (
                <img src={user.profilePhotoUrl} alt="Profile" className="profile-icon-image" />
              ) : (
                <span className="profile-icon-initial">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </span>
              )}
            </Link>
            <button onClick={logout} className="logout-btn-header">Logout</button>
          </div>
        )}
      </header>
      
      <main className="app-content">
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;