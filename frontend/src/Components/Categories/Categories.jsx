// import React, { useRef, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Categories.css';
// import deliveryBoy from "../../assets/images/delivery-boy.png";
// import burger from '../../assets/images/burger.png';
// import coffee from '../../assets/images/coffee.png';
// import fries from '../../assets/images/fries.png';
// import chicken from '../../assets/images/chicken.png';
// import pizza from '../../assets/images/pizza.png';
// import paneer from '../../assets/images/paneer.png';
// import noodles from '../../assets/images/noodles.png';
// import donuts from '../../assets/images/donuts.png';

// const Categories = () => {
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const cardWidth = window.innerWidth / 5; 
//   const visibleCount = 5;
//   const categories = [
//     { name: 'Coffee', img: coffee },
//     { name: 'Fries', img: fries },
//     { name: 'Chicken', img: chicken },
//     { name: 'Pizza', img: pizza },
//     { name: 'Paneer', img: paneer },
//     { name: 'Burger', img: burger },
//     { name: 'Noodles', img: noodles },
//     { name: 'Donuts', img: donuts },
//   ];

//   const maxScrollPosition = (categories.length - visibleCount) * cardWidth;

//   const scrollLeft = () => {
//     setScrollPosition((prevPos) => {
//       let newPos = prevPos - cardWidth;
//       if (newPos < 0) {
//         newPos = 0; // Reset to the start if already at the beginning
//       }
//       return newPos;
//     });
//   };

//   const scrollRight = () => {
//     setScrollPosition((prevPos) => {
//       let newPos = prevPos + cardWidth;
//       if (newPos > maxScrollPosition) {
//         newPos = maxScrollPosition; // Keep within the max scroll position
//       }
//       return newPos;
//     });
//   };

//   useEffect(() => {
//     scrollRef.current.scrollTo({
//       left: scrollPosition,
//       behavior: 'smooth',
//     });
//   }, [scrollPosition]);
//   const handleCategoryClick = (foodType) => {
//     navigate(`/customer/restaurants/${foodType}`);
// };

//   return (
//     <div className="categories-section">
//       <div className="categories-header">
//         <h2 className="categories-title">Categories</h2>
//         <div className="scroll-btn-container">
//           <button className="scroll-btn left-btn" onClick={scrollLeft}>
//             &lt;
//           </button>
//           <button className="scroll-btn right-btn" onClick={scrollRight}>
//             &gt;
//           </button>
//         </div>
//       </div>
//       <p className="categories-subtitle">
//         Browse our top categories here to discover different food cuisines.
//       </p>
//       <div className="categories-container">
//         <div className="categories-list" ref={scrollRef}>
//         {categories.map((category, index) => (
//           <div 
//               className="category-card" 
//               key={index} 
//               onClick={() => handleCategoryClick(category.name.toLowerCase())}
//           >
//               <img src={category.img} alt={category.name} className="category-img" />
//               <p className="category-name">{category.name}</p>
//           </div>
//       ))}
//         </div>
//         <img src={deliveryBoy} alt="Delivery Boy" className="scooter-img" />
//       </div>
//     </div>
//   );
// };

// export default Categories;



import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SearchBox/SearchBox.css';
import './Categories.css';
import topLeftImage from '../../assets/images/parachute-1.png'; // Top left image import
import topRightImage from '../../assets/images/parachute-2.png'; // Top right image import
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const cardWidth = window.innerWidth / 5;
  const visibleCount = 5;

  const maxScrollPosition = (categories.length - visibleCount) * cardWidth;

  const scrollLeft = () => {
    setScrollPosition((prevPos) => {
      let newPos = prevPos - cardWidth;
      if (newPos < 0) {
        newPos = 0; // Reset to the start if already at the beginning
      }
      return newPos;
    });
  };

  const scrollRight = () => {
    setScrollPosition((prevPos) => {
      let newPos = prevPos + cardWidth;
      if (newPos > maxScrollPosition) {
        newPos = maxScrollPosition; // Keep within the max scroll position
      }
      return newPos;
    });
  };

  useEffect(() => {
    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, [scrollPosition]);

  const handleSearch = () => {
    const category = categories.find(cat => cat.name.toLowerCase() === searchTerm.toLowerCase());
    if (category) {
      navigate(`/customer/restaurants/${category.name.toLowerCase()}`);
    } else {
      console.log('Category not found');
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
          />
          <button className="search-button" onClick={handleSearch}>SEARCH</button>
        </div>

        {/* Floating food icons */}
        <div className="floating-icons">
          <div className="food-item food1"></div>
          <div className="food-item food2"></div>
          <div className="food-item food3"></div>
        </div>

        {/* Add top left and top right floating images */}
        <img src={topLeftImage} alt="Top Left" className="floating-image top-left-img" />
        <img src={topRightImage} alt="Top Right" className="floating-image top-right-img" />
      </div>

      <div className="categories-section">
        <div className="categories-header">
          <h2 className="categories-title">Categories</h2>
          <div className="scroll-btn-container">
            <button className="scroll-btn left-btn" onClick={scrollLeft}>
              &lt;
            </button>
            <button className="scroll-btn right-btn" onClick={scrollRight}>
              &gt;
            </button>
          </div>
        </div>
        <p className="categories-subtitle">
          Browse our top categories here to discover different food cuisines.
        </p>
        <div className="categories-container">
          <div className="categories-list" ref={scrollRef}>
            {categories.map((category, index) => (
              <div 
                className="category-card" 
                key={index} 
                onClick={() => handleCategoryClick(category.name.toLowerCase())}
              >
                <img src={category.img} alt={category.name} className="category-img" />
                <p className="category-name">{category.name}</p>
              </div>
            ))}
          </div>
          <img src={deliveryBoy} alt="Delivery Boy" className="scooter-img" />
        </div>
      </div>
    </div>
  );
};

export default Categories;