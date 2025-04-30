import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMenuItemForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('foodType', foodType);
    formData.append('discount', discount);
    formData.append('image', image);

    try {
      const res = await axios.post(
        'http://localhost:3000/restaurant/menu/item',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert('Menu item added successfully');
      navigate('/restaurant');
    } catch (error) {
      console.error('Error adding menu item', error);
    }
  };

  return (
    <div className="min-h-screen bg- flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Menu Item</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
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

            <div>
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

            <div>
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

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Discount:</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter discount (optional)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Add Menu Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMenuItemForm;