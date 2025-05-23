import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/Postjob';
import MyJobs from './pages/Myjobs';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/post-job" element={user?.role === 'employer' ? <PostJob user={user} /> : <Navigate to="/login" />} />
          <Route path="/my-jobs" element={user?.role === 'employer' ? <MyJobs user={user} /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={user ? <Favorites user={user} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
