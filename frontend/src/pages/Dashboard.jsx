import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${userId}`);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
        setBookings(res.data);
      } catch (err) {
        setBookings([]);
      }
    };
    if (userId) {
      fetchUser();
      fetchBookings();
    }
  }, [userId]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">
          {user ? `Welcome, ${user.name}!` : 'Welcome to your Dashboard'}
        </h1>
        <div className="dashboard-summary">
          <p>You have <span className="dashboard-bookings-count">{bookings.length}</span> upcoming stay{bookings.length !== 1 ? 's' : ''}.</p>
        </div>
        <Link to="/my-bookings" className="dashboard-btn">View My Bookings</Link>
        <Link to="/" className="dashboard-btn dashboard-btn-secondary">Book a New Stay</Link>
      </div>
    </div>
  );
};

export default Dashboard;
  