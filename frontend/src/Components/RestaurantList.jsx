import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import RestaurantCard from './RestaurantCard'; // Ensure this component is styled attractively
import { useParams } from 'react-router-dom';

const RestaurantsList = () => {
    const { foodType } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleRestaurants, setVisibleRestaurants] = useState(8);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/customer/restaurants/by-food-type/${foodType}`);
                setRestaurants(response.data);
                setFilteredRestaurants(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch restaurants. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [foodType]);

    // Filter restaurants by search query
    useEffect(() => {
        if (searchQuery) {
            const updatedList = restaurants.filter((restaurant) =>
                restaurant.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredRestaurants(updatedList);
        } else {
            setFilteredRestaurants(restaurants);
        }
    }, [searchQuery, restaurants]);

    const loadMoreRestaurants = () => {
        setVisibleRestaurants((prev) => prev + 8);
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                <p className="mt-4 text-blue-500 font-semibold">Loading restaurants...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 py-10">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                {foodType ? `Top Picks for ${foodType}` : 'Explore Our Best Restaurants'}
            </h1>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Search for restaurants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded-full px-6 py-3 w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                </div>
                {filteredRestaurants.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p className="text-xl font-medium">No restaurants found for this category.</p>
                        <p className="mt-2">Try exploring other categories or check back later!</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredRestaurants.slice(0, visibleRestaurants).map((restaurant) => (
                                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                            ))}
                        </div>
                        {visibleRestaurants < filteredRestaurants.length && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={loadMoreRestaurants}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default RestaurantsList;
