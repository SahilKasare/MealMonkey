import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section about">
            <div className="footer-logo">
              <img src={logo} alt="Logo" />
            </div>
            <p className="footer-description">
              Welcome to our online order website! Here, you can browse our wide
              selection of products and place orders from the comfort of your own home.
            </p>
          </div>

          <div className="footer-links-wrapper">
            <div className="footer-section links">
              <h2>Company</h2>
              <ul>
                <li><Link to="/">About us</Link></li>
                <li><Link to="/">Contact us</Link></li>
                <li><Link to="/">Offer</Link></li>
                <li><Link to="/">FAQs</Link></li>
              </ul>
            </div>

            <div className="footer-section links">
              <h2>Account</h2>
              <ul>
                <li><Link to="/">My orders</Link></li>
                <li><Link to="/">Wishlist</Link></li>
                <li><Link to="/">Shopping Cart</Link></li>
                <li><Link to="/">Saved Address</Link></li>
              </ul>
            </div>

            <div className="footer-section links">
              <h2>Useful Links</h2>
              <ul>
                <li><Link to="/">Blogs</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/">Profile</Link></li>
                <li><Link to="/">Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />
        <p className="copyright">
          © Copyright 2024 MealMonkey. All rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;