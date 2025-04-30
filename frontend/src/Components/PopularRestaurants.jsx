// import { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';

// const PopularRestaurants = () => {
//     const [restaurants, setRestaurants] = useState([]);

//     useEffect(() => {
//         const fetchRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get('/customer/popularRestaurants');
//                 setRestaurants(response.data);  // Set the fetched data into state
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching restaurants:', error);
//             }
//         };

//         fetchRestaurants();
//     }, []);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Popular Restaurants</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {restaurants.length > 0 ? (
//     restaurants.map((restaurant) => (
//         <div key={restaurant._id} className="border p-4 rounded-lg shadow-lg">
//             {/* Check if restaurant has a photos array and use the first photo if available */}
//             <img 
//                 src={restaurant.photos && restaurant.photos.length > 0 ? restaurant.photos[0] : 'default-image-url.jpg'} 
//                 alt={restaurant.hotelName || 'Restaurant Image'} 
//                 className="w-full h-48 object-cover rounded-md"
//             />
//             <div className="mt-2">
//                 <h2 className="text-lg font-bold">{restaurant.hotelName || 'Unknown Restaurant'}</h2>
//                 <p className="text-gray-600">Rating: {restaurant.rating || 'N/A'}</p>
//                 <p className="text-gray-600">Known For: {restaurant.knownFor || 'N/A'}</p>
//                 <p className="text-gray-600">{restaurant.address?.fullAddress || 'Address not available'}</p>
//             </div>
//         </div>
//     ))
// ) : (
//     <p>No restaurants available</p>  // Handle the case where there are no restaurants
// )}

//             </div>
//         </div>
//     );
// };

// export default PopularRestaurants;





// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
// import axiosInstance from '../utils/axiosInstance';

// const PopularRestaurants = () => {
//     const [restaurants, setRestaurants] = useState([]);
//     const navigate = useNavigate();  // Initialize navigate function

//     useEffect(() => {
//         const fetchRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get('/customer/popularRestaurants');
//                 setRestaurants(response.data);  // Set the fetched data into state
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching restaurants:', error);
//             }
//         };

//         fetchRestaurants();
//     }, []);

//     // Function to handle card click and navigate with restaurant id
//     const handleCardClick = (restaurantId) => {
//         navigate(`/customer/menu/${restaurantId}`);  // Navigate to menu route with restaurant id
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Popular Restaurants</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {restaurants.length > 0 ? (
//                 restaurants.map((restaurant) => (
//                     <div 
//                         key={restaurant._id} 
//                         className="border p-4 rounded-lg shadow-lg cursor-pointer"  // Add cursor pointer for clarity
//                         onClick={() => handleCardClick(restaurant._id)}  // Handle card click
//                     >
//                         {/* Check if restaurant has a photos array and use the first photo if available */}
//                         <img 
//                             src={restaurant.photos && restaurant.photos.length > 0 ? restaurant.photos[0] : 'default-image-url.jpg'} 
//                             alt={restaurant.hotelName || 'Restaurant Image'} 
//                             className="w-full h-48 object-cover rounded-md"
//                         />
//                         <div className="mt-2">
//                             <h2 className="text-lg font-bold">{restaurant.hotelName || 'Unknown Restaurant'}</h2>
//                             <p className="text-gray-600">Rating: {restaurant.rating || 'N/A'}</p>
//                             <p className="text-gray-600">Known For: {restaurant.knownFor || 'N/A'}</p>
//                             <p className="text-gray-600">{restaurant.address?.fullAddress || 'Address not available'}</p>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No restaurants available</p>  // Handle the case where there are no restaurants
//             )}
//             </div>
//         </div>
//     );
// };

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';

// const PopularRestaurants = () => {
//     const [restaurants, setRestaurants] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get('/customer/popularRestaurants');
//                 setRestaurants(response.data);
//             } catch (error) {
//                 console.error('Error fetching restaurants:', error);
//             }
//         };

//         fetchRestaurants();
//     }, []);

//     const handleCardClick = (restaurantId) => {
//         navigate(`/customer/menu/${restaurantId}`);
//     };

//     return (
//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 antialiased">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-10 text-center tracking-tight">
//                     Popular Restaurants
//                 </h1>
                
//                 {restaurants.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                         {restaurants.map((restaurant) => (
//                             <div 
//                                 key={restaurant._id} 
//                                 className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer overflow-hidden group border border-orange-100"
//                                 onClick={() => handleCardClick(restaurant._id)}
//                             >
//                                 <div className="relative overflow-hidden">
//                                     <img 
//                                         src="https://source.unsplash.com/500x500/?restaurant"
//                                         alt={restaurant.hotelName || 'Restaurant Image'} 
//                                         className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
//                                     />
//                                     <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-md">
//                                         {restaurant.rating || 'N/A'}
//                                         <span className="text-orange-500 ml-1">★</span>
//                                     </div>
//                                 </div>
//                                 <div className="p-6 space-y-4">
//                                     <h2 className="text-2xl font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors duration-300">
//                                         {restaurant.hotelName || 'Unknown Restaurant'}
//                                     </h2>
//                                     <div className="text-sm text-gray-600 space-y-3">
//                                         <p className="flex items-center">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                                             </svg>
//                                             Known For: <span className="ml-2 italic text-gray-700">{restaurant.knownFor?.join(', ') || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex items-center truncate">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                             </svg>
//                                             {restaurant.address?.fullAddress || 'Address not available'}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-orange-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                         </svg>
//                         <p className="text-2xl text-gray-500 font-semibold">No restaurants available</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PopularRestaurants;



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const PopularRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance.get('/customer/popularRestaurants');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleCardClick = (restaurantId) => {
        navigate(`/customer/menu/${restaurantId}`);
    };

    return (
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 antialiased">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-10 text-center tracking-tight">
                    Popular Restaurants
                </h1>
                
                {restaurants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {restaurants.map((restaurant) => (
                            <div 
                                key={restaurant._id} 
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer overflow-hidden group border border-orange-100"
                                onClick={() => handleCardClick(restaurant._id)}
                            >
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={`http://localhost:3000${restaurant.photos[0]}`|| "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"} 
                                        alt={restaurant.hotelName || 'Restaurant Image'} 
                                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-md">
                                        {restaurant.rating || 'N/A'}
                                        <span className="text-orange-500 ml-1">★</span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors duration-300">
                                        {restaurant.hotelName || 'Unknown Restaurant'}
                                    </h2>
                                    <div className="text-sm text-gray-600 space-y-3">
                                        <p className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            Contact: <span className="ml-2 italic text-gray-700">{ restaurant.contact || 'N/A'}</span>
                                        </p>
                                        <p className="flex items-center truncate">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {restaurant.address?.fullAddress || 'Address not available'}
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