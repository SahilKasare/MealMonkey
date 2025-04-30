// // src/components/RestaurantCard.jsx
// import React from 'react';

// const RestaurantCard = ({ restaurant }) => {
//     const imageUrl = restaurant.photos[0] ? `http://localhost:3000${restaurant.photos[0]}` : '/public/Images/no_image.png';
//     return (
//         <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 transition-transform transform hover:scale-105">
//             <img
//                 src={imageUrl}
//                 alt={restaurant.hotelName}
//                 className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//                 <h3 className="text-xl font-bold text-gray-800">{restaurant.hotelName}</h3>
//                 <p className="text-gray-600">Average Cost: ₹{restaurant.averageCost}</p>
//                 <p className="text-gray-600">Rating: {restaurant.rating} / 5</p>
//                 {/* Add other relevant details */}
//             </div>
//         </div>
//     );
// };

// export default RestaurantCard;

// src/components/RestaurantCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();
    
    // Determine the image URL or use a placeholder if none exists
    const imageUrl = restaurant.photos.length > 0 
        ? `http://localhost:3000${restaurant.photos[0]}`
        : '/public/Images/no_image.png'; // Adjust this path according to your public folder structure

    const handleCardClick = () => {
        // Navigate to the restaurant's menu using its ID
        navigate(`/customer/menu/${restaurant._id}`);
    };

    return (
        <div 
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 transition-transform transform hover:scale-105 cursor-pointer" 
            onClick={handleCardClick} // Add click handler
        >
            <img
                src={imageUrl}
                alt={restaurant.hotelName}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{restaurant.hotelName}</h3>
                <p className="text-gray-600">Average Cost: ₹{restaurant.averageCost}</p>
                <p className="text-gray-600">Rating: {restaurant.rating} / 5</p>
                {/* Add other relevant details */}
            </div>
        </div>
    );
};

export default RestaurantCard;
