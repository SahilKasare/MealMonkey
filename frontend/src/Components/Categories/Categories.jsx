import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SearchBox/SearchBox.css';
import './Categories.css';
import topLeftImage from '../../assets/images/parachute-1.png';
import topRightImage from '../../assets/images/parachute-2.png';
import deliveryBoy from "../../assets/images/delivery-boy.png";
import burger from '../../assets/images/burger.png';
import coffee from '../../assets/images/coffee.png';
import fries from '../../assets/images/fries.png';
import chicken from '../../assets/images/chicken.png';
import pizza from '../../assets/images/pizza.png';
import paneer from '../../assets/images/paneer.png';
import noodles from '../../assets/images/noodles.png';
import donuts from '../../assets/images/donuts.png';

const categories = [
  { name: 'Coffee', img: coffee },
  { name: 'Fries', img: fries },
  { name: 'NonVeg', img: chicken },
  { name: 'Pizza', img: pizza },
  { name: 'Paneer', img: paneer },
  { name: 'Burger', img: burger },
  { name: 'Noodles', img: noodles },
  { name: 'Donuts', img: donuts },
];

const Categories = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notFound, setNotFound] = useState(false);

  // Scroll the carousel by roughly one card width, using the actual rendered
  // size so it stays correct across screen sizes.
  const scrollByCard = (direction) => {
    const list = scrollRef.current;
    if (!list) return;
    const card = list.querySelector('.category-card');
    const amount = card ? card.offsetWidth + 30 : list.clientWidth / 2;
    list.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!notFound) return;
    const timer = setTimeout(() => setNotFound(false), 2500);
    return () => clearTimeout(timer);
  }, [notFound]);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === term || cat.name.toLowerCase().includes(term)
    );
    if (category) {
      navigate(`/customer/restaurants/${category.name.toLowerCase()}`);
    } else {
      setNotFound(true);
    }
  };

  const handleCategoryClick = (foodType) => {
    navigate(`/customer/restaurants/${foodType}`);
  };

  return (
    <div>
      <div className="search-box-container">
        <div className="offer-banner">50% off on First delivery</div>
        <h1 className="main-heading">Made with love, Savored with interest.</h1>
        <p className="sub-heading">
          Browse our top categories here to discover different food cuisine.
        </p>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for Your Favourite Food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>SEARCH</button>
        </div>
        {notFound && (
          <p className="search-hint">
            No category matches “{searchTerm}”. Try Pizza, Burger, Coffee, Paneer…
          </p>
        )}

        {/* Decorative floating parachute images */}
        <img src={topLeftImage} alt="" className="floating-image top-left-img" />
        <img src={topRightImage} alt="" className="floating-image top-right-img" />
      </div>

      <div className="categories-section">
        <div className="categories-header">
          <h2 className="categories-title">Categories</h2>
          <div className="scroll-btn-container">
            <button className="scroll-btn left-btn" aria-label="Scroll left" onClick={() => scrollByCard(-1)}>
              &lt;
            </button>
            <button className="scroll-btn right-btn" aria-label="Scroll right" onClick={() => scrollByCard(1)}>
              &gt;
            </button>
          </div>
        </div>
        <p className="categories-subtitle">
          Browse our top categories here to discover different food cuisines.
        </p>
        <div className="categories-container">
          <div className="categories-list" ref={scrollRef}>
            {categories.map((category) => (
              <div
                className="category-card"
                key={category.name}
                onClick={() => handleCategoryClick(category.name.toLowerCase())}
              >
                <img src={category.img} alt={category.name} className="category-img" />
                <p className="category-name">{category.name}</p>
              </div>
            ))}
          </div>
          <img src={deliveryBoy} alt="" className="scooter-img" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
