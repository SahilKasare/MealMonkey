// src/components/RestaurantCard.jsx
import { useNavigate } from 'react-router-dom';
import { imageUrl } from '../config';

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1170&q=80";

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();

    // Determine the image URL or use a placeholder if none exists
    const src = imageUrl(restaurant.photos?.[0], FALLBACK_IMAGE);

    const handleCardClick = () => {
        navigate(`/customer/menu/${restaurant._id}`);
    };

    return (
        <div
            className="rounded-2xl overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={handleCardClick}
        >
            <img
                src={src}
                alt={restaurant.hotelName || 'Restaurant'}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 truncate">{restaurant.hotelName || 'Unknown Restaurant'}</h3>
                <p className="text-gray-600 mt-1">Average Cost: ₹{restaurant.averageCost ?? 'N/A'}</p>
                <p className="text-gray-600 flex items-center gap-1">
                    <span className="text-orange-500">★</span>
                    {restaurant.rating ? `${restaurant.rating} / 5` : 'New'}
                </p>
            </div>
        </div>
    );
};

export default RestaurantCard;
