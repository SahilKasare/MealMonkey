import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const UpdateMenuItemForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await axiosInstance.get(`/restaurant/getItem/${id}`);
        const item = res.data;
        if (item) {
          setName(item.name || '');
          setPrice(item.price || '');
          setFoodType(item.foodType || '');
         
        }
      } catch (error) {
        console.error('Error fetching menu item', error);
      }
    };
    fetchMenuItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('foodType', foodType);
  

    try {
      const res = await axiosInstance.put(`/restaurant/updateItem/${id}`, formData);
      console.log('Update successful:', res.data);
      alert('Menu item updated successfully');
      navigate('/restaurant');
    } catch (error) {
      console.error('Error updating menu item:', error.response.data);
      alert('Failed to update menu item: ' + error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Menu Item</h2>

        <div className="divide-y divide-gray-200">
          <div className="py-4">
            <label className="block text-gray-700 font-medium mb-2">Dish Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter dish name"
              required
            />
          </div>

          <div className="py-4">
            <label className="block text-gray-700 font-medium mb-2">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="py-4">
            <label className="block text-gray-700 font-medium mb-2">Food Type:</label>
            <input
              type="text"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter food type (e.g., Vegan, Non-Veg)"
              required
            />
          </div>

          
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Update Menu Item
        </button>
      </form>
    </div>
  );
};

export default UpdateMenuItemForm;