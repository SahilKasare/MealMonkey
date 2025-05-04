import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/admin_stats'); // Adjust the URL based on your API structure
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-[700px] bg-gray-900 text-white pt-5 fixed top-[70px] overflow-y-auto">
        <ul className="space-y-4 px-6">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/getCustomers"}>Customers</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/getRestaurants"}>Restaurants</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/getUser"}>Get User</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/addCustomer"}>Add Customer</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/addRestaurant"}>Add Restaurant</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/addAdmin"}>Add Admin</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/deleteUser"}>Delete User</Link>
          </li>
          {/* <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to={"/admin/changeUserRole"}>Change User Role</Link>
          </li> */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-[70px] p-8 flex-1 min-h-screen">
        <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {/* Today's Stats */}
          {stats && (
            <>
              <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">Today's Orders</h2>
                <p className="text-5xl font-bold">{stats.today.ordersCount}</p>
              </div>

              <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">Today's Profit</h2>
                <p className="text-5xl font-bold">₹{stats.today.profit}</p>
              </div>

              <div className="p-6 bg-purple-500 text-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">New Customers Today</h2>
                <p className="text-5xl font-bold">{stats.today.customersJoined}</p>
              </div>

              <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">New Restaurants Today</h2>
                <p className="text-5xl font-bold">{stats.today.restaurantsJoined}</p>
              </div>

              {/* Weekly Stats */}
              <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg mt-8">
                <h2 className="text-3xl font-semibold mb-4">This Week's Orders</h2>
                <p className="text-5xl font-bold">{stats.week.ordersCount}</p>
              </div>

              <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg mt-8">
                <h2 className="text-3xl font-semibold mb-4">This Week's Profit</h2>
                <p className="text-5xl font-bold">₹{stats.week.profit}</p>
              </div>

              <div className="p-6 bg-purple-500 text-white rounded-lg shadow-lg mt-8">
                <h2 className="text-3xl font-semibold mb-4">Customers Joined This Week</h2>
                <p className="text-5xl font-bold">{stats.week.customersJoined}</p>
              </div>

              <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-lg mt-8">
                <h2 className="text-3xl font-semibold mb-4">Restaurants Joined This Week</h2>
                <p className="text-5xl font-bold">{stats.week.restaurantsJoined}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
