import { Link } from 'react-router-dom';
import './Footer.css'; // Importing the CSS file for styling
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="footer-logo"><img src={logo} alt="Logo" /></h1>
          <p>
            Welcome to our online order website! Here, you can browse our wide
            selection of products and place orders from the comfort of your own home.
          </p>
          <div className="socials">
            <Link to="/"><i className="fab fa-facebook"></i></Link>
            <Link to="/"><i className="fab fa-twitter"></i></Link>
            <Link to="/"><i className="fab fa-linkedin"></i></Link>
            <Link to="/"><i className="fab fa-instagram"></i></Link>
            <Link to="/"><i className="fab fa-youtube"></i></Link>
          </div>
        </div>
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
        <div className="footer-section links">
          <h2>Top Brands</h2>
          <ul>
            <li><Link to="/">PizzaBoy</Link></li>
            <li><Link to="/">Saladish</Link></li>
            <li><Link to="/">IcePops</Link></li>
            <li><Link to="/">Mexican Hoy</Link></li>
            <li><Link to="/">La Foodie</Link></li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="copyright">© Copyright 2024 MealMonkey. All rights Reserved.</p>
    </footer>
  );
}

export default Footer;
