import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
const AddRestaurant = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        contact: '',
        fullAddress: '',
        pincode: '',
        hotelName: '',
        averageCost: '',
        knownFor: '',
        rating: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/admin/addRestaurant', formData);
            alert(response.data.message);
            navigate('/admin')
        } catch (error) {
            console.error('Error adding restaurant:', error);
            alert('Failed to add restaurant');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Restaurant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="fullAddress"
                    placeholder="Full Address"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="hotelName"
                    placeholder="Hotel Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="averageCost"
                    placeholder="Average Cost"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="knownFor"
                    placeholder="Known For"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                    Add Restaurant
                </button>
            </form>
        </div>
    );
};

export default AddRestaurant;
