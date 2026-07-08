import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';
import logo from "../../assets/images/logo.png";
import Cookies from 'js-cookie'; // Import js-cookie for easier cookie handling

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Read the auth state from cookies. Runs on mount, on every route change,
  // and whenever another component fires an "auth-change" event (login/logout),
  // so the navbar always reflects the current user without a page refresh.
  useEffect(() => {
    const syncAuth = () => {
      const token = Cookies.get('token');
      const userRole = Cookies.get('role');
      setLoggedIn(Boolean(token));
      setRole(token ? userRole : '');
    };

    syncAuth();
    window.addEventListener('auth-change', syncAuth);
    return () => window.removeEventListener('auth-change', syncAuth);
  }, [location.pathname]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setRole('');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  // Build the role-specific navigation links.
  const navLinks = (() => {
    if (loggedIn && role === 'restaurant') {
      return [
        { to: '/restaurant/', label: 'Home' },
        { to: '/restaurant/menu/item', label: 'Add dish' },
        { to: '/restaurant/menu', label: 'Menu' },
        { to: '/restaurant/orders', label: 'My Orders' },
        { to: '/restaurant/profileDetails', label: 'Profile' },
      ];
    }
    if (loggedIn && role === 'deliveryPartner') {
      return [
        { to: '/deliveryPartner/', label: 'Home' },
        { to: '/deliveryPartner/stats', label: 'Analytics' },
        { to: '/deliveryPartner/activeOrders', label: 'Active Orders' },
        { to: '/deliveryPartner/ordersDelivered', label: 'Orders Delivered' },
        { to: '/deliveryPartner/profile', label: 'Profile' },
      ];
    }
    if (loggedIn && role === 'admin') {
      return [
        { to: '/admin/', label: 'Home' },
        { to: '/admin/getCustomers', label: 'Customers' },
        { to: '/admin/getRestaurants', label: 'Restaurants' },
      ];
    }
    if (loggedIn && role === 'customer') {
      return [
        { to: '/customer/', label: 'Home' },
        { to: '/customer/orders', label: 'My Orders' },
        { to: '/customer/cart', label: 'Cart' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ];
    }
    return [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { to: '/FAQ', label: 'FAQs' },
    ];
  })();

  return (
    <header className='header'>
      <Link to='/' className='header-logo' aria-label='MealMonkey home'>
        <img src={logo} alt="MealMonkey" />
      </Link>

      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.to + link.label} to={link.to}>{link.label}</Link>
        ))}

        <div className='navbar-auth'>
          {loggedIn ? (
            <button className='auth-btn logout-btn' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className='auth-btn' to='/login'>Login</Link>
              <Link className='auth-btn register-btn' to='/register'>Register</Link>
            </>
          )}
        </div>
      </nav>

      <button
        className='menu-toggle'
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
};

export default Header;
