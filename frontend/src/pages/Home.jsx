import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './Home.css';
import { SearchBarContext } from '../SearchBarContext';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const { focusSearchBar } = useContext(SearchBarContext);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.LISTINGS);
        setListings(res.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowSearch(false);
    };
    if (showSearch) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showSearch]);

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(search.toLowerCase()) ||
      listing.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleExploreClick = () => {
    focusSearchBar();
  };

  const handleCloseSearch = (e) => {
    if (e.target.id === 'search-modal-bg') setShowSearch(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen pb-12 font-sans text-gray-100">
      {/* Action Bar: Explore, Host, Search */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 items-center mt-0 pt-8 pb-8 bg-gray-900 z-10 sticky top-0">
        <button
          onClick={handleExploreClick}
          className="action-btn"
        >
          Explore Stays
        </button>
        <button
          className="action-btn"
        >
          Become a Host
        </button>
      </div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-overlay">
            <h1 className="hero-title">Find Your Next Stay</h1>
            <p className="hero-subtitle">Book unique homes and experiences all over the world.</p>
            {/* Example CTA button, you can uncomment if needed */}
            {/* <button className="hero-btn">Explore Now</button> */}
          </div>
        </div>
      </section>

      {/* Search Modal */}
      {showSearch && (
        <div id="search-modal-bg" onClick={handleCloseSearch} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md mx-4 relative flex flex-col gap-4">
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-rose-500 text-2xl font-bold transition duration-200"
              style={{lineHeight:'1'}}
            >
              &times;
            </button>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by location or title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg placeholder-gray-400 transition duration-200"
            />
          </div>
        </div>
      )}

      {/* Listings Grid */}
      <section className="listings-section">
        <h2 className="listings-title">Featured Stays</h2>
        <div className="listings-grid">
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="listing-card"
            >
              <img
                src={listing.image || 'https://picsum.photos/400/300'}
                alt={listing.title}
                className="listing-img"
              />
              <div className="listing-card-body">
                <div>
                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-location">{listing.location}</p>
                  <p className="listing-price">₹{listing.price} <span className="listing-price-night">/ night</span></p>
                </div>
                <Link to={`/listing/${listing._id}`} className="listing-btn-link">
                  <button className="listing-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
