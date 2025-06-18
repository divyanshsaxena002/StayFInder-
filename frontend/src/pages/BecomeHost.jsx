import React, { useState } from 'react';
import axios from 'axios';
import './BecomeHost.css';

const BecomeHost = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    image: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/listings', {
        ...form,
        price: Number(form.price)
      });
      setSuccess('Property posted successfully!');
      setForm({ title: '', description: '', location: '', price: '', image: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post property.');
    }
    setLoading(false);
  };

  return (
    <div className="becomehost-container">
      <form className="becomehost-form" onSubmit={handleSubmit}>
        <h2 className="becomehost-title">Become a Host</h2>
        <input
          className="becomehost-input"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="becomehost-input"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="becomehost-input"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          className="becomehost-input"
          name="price"
          type="number"
          min="0"
          placeholder="Price per night (INR)"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="becomehost-input"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <button className="becomehost-btn" type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Property'}
        </button>
        {success && <div className="becomehost-success">{success}</div>}
        {error && <div className="becomehost-error">{error}</div>}
      </form>
    </div>
  );
};

export default BecomeHost; 