import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css'; // Importing the CSS file for styling
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <div className="footer-logo"><img src={logo} alt="MealMonkey" /></div>
          <p>
            Welcome to MealMonkey! Browse our wide selection of restaurants and
            dishes, and place orders from the comfort of your own home.
          </p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
        <div className="footer-section links">
          <h2>Company</h2>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/FAQ">FAQs</Link></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Account</h2>
          <ul>
            <li><Link to="/customer/orders">My orders</Link></li>
            <li><Link to="/customer/cart">Shopping Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Useful Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/FAQ">Help</Link></li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="copyright">© Copyright 2024 MealMonkey. All rights Reserved.</p>
    </footer>
  );
}

export default Footer;
