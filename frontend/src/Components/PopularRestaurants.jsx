import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { imageUrl } from '../config';

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1170&q=80";

const PopularRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance.get('/customer/popularRestaurants');
                setRestaurants(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error('Error fetching restaurants:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const handleCardClick = (restaurantId) => {
        navigate(`/customer/menu/${restaurantId}`);
    };

    return (
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8 antialiased">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-10 text-center tracking-tight">
                    Popular Restaurants
                </h1>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-orange-100 animate-pulse">
                                <div className="w-full h-56 bg-orange-100" />
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-orange-100 rounded w-3/4" />
                                    <div className="h-4 bg-orange-100 rounded w-1/2" />
                                    <div className="h-4 bg-orange-100 rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-orange-100">
                        <p className="text-xl text-gray-600 font-semibold mb-2">Couldn&apos;t load restaurants</p>
                        <p className="text-gray-500">Please check your connection and try again.</p>
                    </div>
                ) : restaurants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {restaurants.map((restaurant) => (
                            <div
                                key={restaurant._id}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden group border border-orange-100"
                                onClick={() => handleCardClick(restaurant._id)}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={imageUrl(restaurant.photos?.[0], FALLBACK_IMAGE)}
                                        alt={restaurant.hotelName || 'Restaurant'}
                                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-md">
                                        {restaurant.rating || 'New'}
                                        <span className="text-orange-500 ml-1">★</span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors duration-300">
                                        {restaurant.hotelName || 'Unknown Restaurant'}
                                    </h2>
                                    <div className="text-sm text-gray-600 space-y-3">
                                        <p className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Contact: <span className="ml-2 italic text-gray-700">{restaurant.contact || 'N/A'}</span>
                                        </p>
                                        <p className="flex items-center truncate">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="truncate">{restaurant.address?.fullAddress || 'Address not available'}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-orange-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-2xl text-gray-500 font-semibold">No restaurants available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularRestaurants;
