import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
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
    if (userId) fetchUser();
  }, [userId]);

  if (!user) {
    return (
      <div className="account-container">
        <div className="account-card">
          <h2 className="account-title">Account Info</h2>
          <p className="account-loading">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-card">
        <img src={`https://i.pravatar.cc/100?u=${user._id}`} alt="avatar" className="account-avatar" />
        <h2 className="account-title">{user.name}</h2>
        <div className="account-info">
          <div><strong>User ID:</strong> <span>{user._id}</span></div>
          <div><strong>Name:</strong> <span>{user.name}</span></div>
          <div><strong>Email:</strong> <span>{user.email}</span></div>
        </div>
        <button className="account-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Account;
  