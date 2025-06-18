import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import BecomeHost from './pages/BecomeHost';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ListingDetail from './pages/ListingDetail';
import MyBookings from './pages/MyBookings';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import { SearchBarProvider } from './SearchBarContext';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {/* Sidebar is removed for a cleaner layout */}
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/become-host" element={<BecomeHost />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <SearchBarProvider>
      <Router>
        <AppContent />
      </Router>
    </SearchBarProvider>
  );
}

export default App;
