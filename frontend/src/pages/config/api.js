// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  USER_PROFILE: (userId) => `${API_BASE_URL}/api/auth/${userId}`,
  
  // Listings endpoints
  LISTINGS: `${API_BASE_URL}/api/listings`,
  LISTING_DETAIL: (id) => `${API_BASE_URL}/api/listings/${id}`,
  
  // Bookings endpoints
  BOOKINGS: `${API_BASE_URL}/api/bookings`,
  USER_BOOKINGS: (userId) => `${API_BASE_URL}/api/bookings/${userId}`,
  USER_BOOKINGS_ALT: (userId) => `${API_BASE_URL}/api/bookings/user/${userId}`,
};

export default API_BASE_URL; 