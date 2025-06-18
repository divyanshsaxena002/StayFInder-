import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import '../Auth.css';

const Auth = () => {
  const [tab, setTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, type) => {
    if (type === 'login') {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(API_ENDPOINTS.LOGIN, loginData);
      const userId = res.data.user._id || res.data.user.id;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', userId);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(API_ENDPOINTS.REGISTER, signupData);
      setTab('login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="auth-title">Login Form</h2>
        <div className="auth-tabs">
          <button
            className={`auth-tab${tab === 'login' ? ' auth-tab-active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-tab${tab === 'signup' ? ' auth-tab-active' : ''}`}
            onClick={() => { setTab('signup'); setError(''); }}
            type="button"
          >
            Signup
          </button>
        </div>
        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={e => handleChange(e, 'login')}
              required
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={e => handleChange(e, 'login')}
              required
              className="auth-input"
            />
            <div className="auth-forgot">
              <span>Forgot password?</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="auth-btn"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="auth-error">{error}</p>}
          </form>
        ) : (
          <form onSubmit={handleSignup} className="auth-form">
            <input
              name="name"
              placeholder="Name"
              value={signupData.name}
              onChange={e => handleChange(e, 'signup')}
              required
              className="auth-input"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={signupData.email}
              onChange={e => handleChange(e, 'signup')}
              required
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={e => handleChange(e, 'signup')}
              required
              className="auth-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="auth-btn"
            >
              {loading ? 'Registering...' : 'Signup'}
            </button>
            {error && <p className="auth-error">{error}</p>}
          </form>
        )}
        <div className="auth-footer">
          {tab === 'login' ? (
            <>
              Not a member?{' '}
              <span className="auth-link" onClick={() => { setTab('signup'); setError(''); }}>Signup now</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="auth-link" onClick={() => { setTab('login'); setError(''); }}>Login now</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
