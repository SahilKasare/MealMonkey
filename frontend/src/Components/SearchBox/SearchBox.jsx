import React from 'react';
import './SearchBox.css';
import topLeftImage from '../../assets/images/parachute-1.png'; // Top left image import
import topRightImage from '../../assets/images/parachute-2.png'; // Top right image import

const SearchBox = () => {
  return (
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
          placeholder="Search for Restaurant"
        />
        <button className="search-button">SEARCH</button>
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
  );
};

export default SearchBox;
