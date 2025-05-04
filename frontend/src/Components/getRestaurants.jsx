// import { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';

// const Restaurants = () => {
//     const [restaurants, setRestaurants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get('/admin/getRestaurants');
//                 setRestaurants(response.data);
//             } catch (err) {
//                 setError('Failed to fetch restaurants');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRestaurants();
//     }, []);

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center">Restaurants</h2>
//             {loading && <p className="text-center">Loading...</p>}
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             {!loading && !error && (
//                 <table className="min-w-full table-auto">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="px-4 py-2">Username</th>
//                             <th className="px-4 py-2">Email</th>
//                             <th className="px-4 py-2">Contact</th>
//                             <th className="px-4 py-2">Hotel Name</th>
//                             <th className="px-4 py-2">Known For</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {restaurants.length > 0 ? (
//                             restaurants.map((restaurant) => (
//                                 <tr key={restaurant._id} className="border-b">
//                                     <td className="px-4 py-2">{restaurant.username}</td>
//                                     <td className="px-4 py-2">{restaurant.email}</td>
//                                     <td className="px-4 py-2">{restaurant.contact}</td>
//                                     <td className="px-4 py-2">{restaurant.hotelName}</td>
//                                     <td className="px-4 py-2">{restaurant.knownFor}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="5" className="text-center py-4">No restaurants found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default Restaurants;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance.get('/admin/getRestaurants');
                setRestaurants(response.data);
            } catch (err) {
                setError('Failed to fetch restaurants');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const handleRestaurantClick = (restaurantId) => {
        navigate(`/admin/${restaurantId}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Restaurants</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Contact</th>
                            <th className="px-4 py-2">Hotel Name</th>
                            <th className="px-4 py-2">Known For</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.length > 0 ? (
                            restaurants.map((restaurant) => (
                                <tr key={restaurant._id} className="border-b cursor-pointer" onClick={() => handleRestaurantClick(restaurant._id)}>
                                    <td className="px-4 py-2">{restaurant.username}</td>
                                    <td className="px-4 py-2">{restaurant.email}</td>
                                    <td className="px-4 py-2">{restaurant.contact}</td>
                                    <td className="px-4 py-2">{restaurant.hotelName}</td>
                                    <td className="px-4 py-2">{restaurant.knownFor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No restaurants found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Restaurants;