import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { SearchBarContext } from '../SearchBarContext';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const { searchBarRef } = useContext(SearchBarContext);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${userId}`);
        setUserName(res.data.name);
      } catch (err) {
        setUserName('');
      }
      setLoading(false);
    };
    if (isLoggedIn && userId) fetchUser();
  }, [isLoggedIn, userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <span className="logo-blue">findyour</span><span className="logo-orange">Stay</span>
        </Link>
      </div>
      <input
        ref={searchBarRef}
        className="navbar-search"
        type="text"
        placeholder="Search stays, locations..."
      />
      <ul className="navbar-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        {isLoggedIn && <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>}
        {isLoggedIn && <li><Link to="/account" className="nav-link">Account</Link></li>}
        {isLoggedIn && <li><Link to="/my-bookings" className="nav-link">My Bookings</Link></li>}
      </ul>
      <div className="navbar-cta">
        {isLoggedIn ? (
          <>
            {loading ? (
              <span className="nav-user-loading">Loading...</span>
            ) : (
              userName && <span className="nav-user-name">{userName}</span>
            )}
            <button onClick={handleLogout} className="book-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="book-btn nav-auth-btn">Login</Link>
            <Link to="/signup" className="book-btn nav-auth-btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
