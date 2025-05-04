import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const UserSearchForm = () => {
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setUserData(null);
            
            const response = await axiosInstance.post('/admin/getUser', { email });
            if (response.data.message) {
                setError(response.data.message);
            } else {
                setUserData(response.data);
            }
        } catch (err) {
            setError(err || 'An error occurred while fetching user data.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Search for User</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Search
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                {userData && (
                    <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
                        <h2 className="font-bold mb-2">User Details:</h2>
                        <p><strong>Name:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Address:</strong> {userData.address?.fullAddress}</p>
                        <p><strong>Pincode:</strong> {userData.address?.pincode}</p>
                        <p><strong>Contact:</strong> {userData.contact}</p>
                        <p><strong>Role:</strong> {userData.role}</p>

                        {userData.role === 'deliveryPartner' && (
                            <>
                                <p><strong>License:</strong> {userData.license}</p>
                                <p><strong>Vehicle Number:</strong> {userData.vehicleNumber}</p>
                            </>
                        )}

                        {userData.role === 'restaurant' && (
                            <>
                                <p><strong>Hotel Name:</strong> {userData.hotelName}</p>
                                <p><strong>Average Cost:</strong> {userData.averageCost}</p>
                                <p><strong>Known For:</strong> {userData.knownFor}</p>
                                <p><strong>Type:</strong> {userData.type}</p>
                                <p><strong>Rating:</strong> {userData.rating}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSearchForm;
