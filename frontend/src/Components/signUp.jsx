import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '', contact: '', fullAddress: '', pincode: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    setError(''); // Reset error
    try {
      const response = await axiosInstance.post('/register', formData);
      if (response.status === 201) {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      setError(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-white relative -mt-5">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://your-image-url.com/bg.jpg')" }}></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10 relative">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up to MealMonkey</h2>
        <p className="text-center text-gray-500 mb-6">Join the best food delivery platform</p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={onChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={onChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={onChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="" disabled>Select Your Role</option>
              <option value="customer">Customer</option>
              <option value="restaurant">Manager</option>
              <option value="deliveryPartner">Delivery Partner</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={onChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="fullAddress"
              placeholder="Full Address"
              value={formData.fullAddress}
              onChange={onChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={onChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
