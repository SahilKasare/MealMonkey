// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Header.css';
// import logo from "../../assets/images/logo.png";
// import Cookies from 'js-cookie'; // Import js-cookie for easier cookie handling

// const Header = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//   // Function to check login status from cookies
//   useEffect(() => {
//     const token = Cookies.get('token'); // Get token from cookies
//     const userRole = Cookies.get('role'); // Get role from cookies

//     if (token) {
//       setLoggedIn(true);
//       setRole(userRole); // Set the user's role
//     } else {
//       setLoggedIn(false);
//     }
//   }, []);

//   // Function to handle logout
//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('role');
//     setLoggedIn(false);
//     setRole('');
//     navigate('/login');
//   };

//   return (
//     <header className='header'>
//       <Link to='/' className='w-52'>
//         <img src={logo} alt="Logo" />
//       </Link>

//       <nav className='navbar'>

//         {loggedIn && role === 'restaurant' && (
//           <>
//             <Link to='/restaurant/'>Home</Link>
//             <Link to='/restaurant/menu/item'>Add dish</Link>
//             <Link to='/restaurant/menu'>Menu</Link>
//             <Link to='/restaurant/orders'>My Orders</Link>
//             <Link to='/restaurant/profileDetails'>Profile</Link>
//           </>
//         )}
//         {loggedIn && role === 'deliveryPartner' && (
//           <>
//             <Link to='/deliveryPartner/'>Home</Link>
//             <Link to='/deliveryPartner/stats'>Analytics</Link>
//             <Link to='/deliveryPartner/activeOrders'>Active Orders</Link>
//             <Link to='/deliveryPartner/ordersDelivered'>Orders Delivered</Link>
//             <Link to='/deliveryPartner/profile'>Profile</Link>
//           </>
//         )}
//         {loggedIn && role === 'admin' && (
//           <>
//             <Link to='/admin/'>Home</Link>
//             <Link to='/admin'>Reviews</Link>
//           </>
//         )}
//         {loggedIn && role === 'customer' && (
//           <>
//             <Link to='/customer/'>Home</Link>
//             <Link to='/customer/orders'>My Orders</Link>
//             <Link to='/customer/cart'>Cart</Link>
//             <Link to='/about'>About</Link>
//         <Link to='/contact'>Contact</Link>
//           </>
//         )}
//         {!loggedIn && <Link to='/'>Home</Link>}
//         {!loggedIn && <Link to='/about'>About</Link>}
//         {!loggedIn && <Link to='/contact'>Contact</Link>}
//         {!loggedIn && <Link to='/FAQ'>FAQs</Link>}

//       </nav>

//       <div className='text-xl text-black'>
//         {loggedIn ? (
//           <button
//             className='relative text-white font-medium ml-[20px] text-[21px] transition-colors duration-300 hover:text-orange-500'
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link
//               className='relative text-white font-medium ml-[70px] text-[21px] transition-colors duration-300 hover:text-orange-500'
//               to='/login'
//             >
//               Login
//             </Link>
//             <Link
//               className='relative text-white font-medium ml-[20px] text-[21px] transition-colors duration-300 hover:text-orange-500'
//               to='/register'
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/logo.png";
import { useUser } from "../../contexts/UserProvider";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Or use any icon library

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = !!user;
  const role = user?.role;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <X color="#fff" size={28} /> : <Menu color="#fff" size={28} />}
      </div>

      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        {loggedIn && role === "restaurant" && (
          <>
            <Link to="/restaurant/">Home</Link>
            <Link to="/restaurant/menu/item">Add dish</Link>
            <Link to="/restaurant/menu">Menu</Link>
            <Link to="/restaurant/orders">My Orders</Link>
            <Link to="/restaurant/profileDetails">Profile</Link>
          </>
        )}
        {loggedIn && role === "deliveryPartner" && (
          <>
            <Link to="/deliveryPartner/">Home</Link>
            <Link to="/deliveryPartner/stats">Analytics</Link>
            <Link to="/deliveryPartner/activeOrders">Active Orders</Link>
            <Link to="/deliveryPartner/ordersDelivered">Orders Delivered</Link>
            <Link to="/deliveryPartner/profile">Profile</Link>
          </>
        )}
        {loggedIn && role === "admin" && (
          <>
            <Link to="/admin/">Home</Link>
            <Link to="/admin">Reviews</Link>
          </>
        )}
        {loggedIn && role === "customer" && (
          <>
            <Link to="/customer/">Home</Link>
            <Link to="/customer/orders">My Orders</Link>
            <Link to="/customer/cart">Cart</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </>
        )}
        {!loggedIn && (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/FAQ">FAQs</Link>
          </>
        )}
        <div className="auth-links">
          {loggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="login-btn" to="/login">Login</Link>
              <Link className="register-btn" to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
