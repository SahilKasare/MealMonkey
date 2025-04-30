
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';

// const RestaurantDetails = () => {
//     const { restaurantId } = useParams();
//     const [analytics, setAnalytics] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchAnalytics = async () => {
//             try {
//                 const response = await axiosInstance.get(`/admin/analytics/${restaurantId}`);
//                 setAnalytics(response.data);
//             } catch (err) {
//                 setError('Failed to fetch analytics');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAnalytics();
//     }, [restaurantId]);

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center">Restaurant Analytics</h2>
//             {loading && <p className="text-center">Loading...</p>}
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             {!loading && !error && (
//                 <div>
//                     {/* Restaurant Details */}
//                     <div className="mb-6 text-center">
//                         {analytics.restaurantDetails?.image && (
//                             <img 
//                                 src={`http://localhost:3000${analytics.restaurantDetails.image}`} 
//                                 alt="Restaurant"
//                                 className="w-96 h-64 mb-4 object-cover border-4 border-orange-300 mx-auto"
//                             />
//                         )}
//                         <h2 className="text-2xl font-semibold text-gray-800">{analytics.restaurantDetails?.name || 'N/A'}</h2>
//                         <p className="text-gray-600">{analytics.restaurantDetails?.email || 'N/A'}</p>
//                         <p className="text-gray-600">{analytics.restaurantDetails?.contact || 'N/A'}</p>
//                         <p className="text-gray-600">{analytics.restaurantDetails?.address || 'N/A'}</p>
//                         <p className="text-gray-600">{analytics.restaurantDetails?.pincode || 'N/A'}</p>
//                     </div>

//                     {/* Analytics Data */}
//                     <p className="text-xl font-semibold mb-4">Today's Profit: ${analytics.dailyBalance}</p>
//                     <p className="text-xl font-semibold mb-4">Total Orders Today: {analytics.dailyOrders}</p>
//                     <p className="text-xl font-semibold mb-4">Weekly Profit: ${analytics.weeklyBalance}</p>
//                     <p className="text-xl font-semibold mb-4">Total Orders This Week: {analytics.weeklyOrders}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RestaurantDetails;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const RestaurantDetails = () => {
    const { restaurantId } = useParams();
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axiosInstance.get(`/admin/analytics/${restaurantId}`);
                setAnalytics(response.data);
            } catch (err) {
                setError('Failed to fetch analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [restaurantId]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Restaurant Analytics</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
                <div>
                    {/* Restaurant Details */}
                    <div className="flex mb-6">
                        {analytics.restaurantDetails?.image && (
                            <img 
                                src={`http://localhost:3000${analytics.restaurantDetails.image}`} 
                                alt="Restaurant"
                                className="w-96 h-64 mb-4 object-cover border-4 border-orange-300"
                            />
                        )}
                        <div className="ml-6">
                            <h2 className="text-2xl font-semibold text-gray-800">{analytics.restaurantDetails?.name || 'N/A'}</h2>
                            <p className="text-gray-600">{analytics.restaurantDetails?.email || 'N/A'}</p>
                            <p className="text-gray-600">{analytics.restaurantDetails?.contact || 'N/A'}</p>
                            <p className="text-gray-600">{analytics.restaurantDetails?.address || 'N/A'}</p>
                            <p className="text-gray-600">{analytics.restaurantDetails?.pincode || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Analytics Data */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Analytics</h3>
                        <p className="text-xl font-semibold mb-4">Today's Profit: ${analytics.dailyBalance}</p>
                        <p className="text-xl font-semibold mb-4">Total Orders Today: {analytics.dailyOrders}</p>
                        <p className="text-xl font-semibold mb-4">Weekly Profit: ${analytics.weeklyBalance}</p>
                        <p className="text-xl font-semibold mb-4">Total Orders This Week: {analytics.weeklyOrders}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;