import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    setLoading(true);
    try {
      const response = await axiosInstance.post('/login', formData);
      if (response.status === 200) {
        const userRole = response.data.role;
        // Let the header (and anything else listening) refresh its auth state.
        window.dispatchEvent(new Event('auth-change'));

        if (userRole === 'admin') {
          navigate('/admin/');
        } else if (userRole === 'customer') {
          navigate('/customer/');
        } else if (userRole === 'restaurant') {
          navigate('/restaurant/');
        } else if (userRole === 'deliveryPartner') {
          navigate('/deliveryPartner/');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      const data = error.response?.data;
      setError(
        typeof data === 'string'
          ? data
          : data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 to-red-600 overflow-hidden py-12 px-4">
      {/* Main content */}
      <div className="relative z-10 bg-white/80 p-10 rounded-3xl shadow-2xl w-full max-w-lg animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide mb-6">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-8">Delicious meals await you, login to order!</p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4 relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-400 transition duration-300"
              required
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-orange-500">
              📧
            </span>
          </div>
          
          <div className="mb-4 relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-400 transition duration-300"
              required
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-orange-500">
              🔒
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-orange-500 hover:underline transition-all duration-200">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Subtle animations */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-red-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
    </div>
  );
};

export default Login;
