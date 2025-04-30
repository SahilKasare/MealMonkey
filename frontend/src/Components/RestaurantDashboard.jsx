import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import axiosInstance from '../utils/axiosInstance';
import { motion } from 'framer-motion';
import { FaWallet, FaChartLine, FaStore, FaMoneyBillWave } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RestaurantDashboard = () => {
    const { user } = useUser();
    const [restaurant, setRestaurant] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [walletBalance, setWalletBalance] = useState(0);
    const [amountToAdd, setAmountToAdd] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRestaurant(user);
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [analyticsRes, walletRes] = await Promise.all([
                    axiosInstance.get('/restaurant/analytics/daily-weekly'),
                    axiosInstance.get('/restaurant/wallet'),
                ]);
                setAnalytics(analyticsRes.data);
                setWalletBalance(walletRes.data.balance);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    const handleAddMoney = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/restaurant/wallet/add', {
                amount: Number(amountToAdd),
            });
            setWalletBalance(res.data.newBalance);
            setAmountToAdd('');
        } catch (error) {
            console.error('Error adding money to wallet:', error);
        }
    };

    if (isLoading || !restaurant || !analytics) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-500"></div>
            </div>
        );
    }

    return (
        <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 -mt-8 p-8"
>
            {/* Header Section */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                    Restaurant Dashboard
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                    Welcome back, <span className="font-semibold">{restaurant.hotelName}</span>!
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Restaurant Details Card */}
                <motion.div
                    className="lg:col-span-8 bg-white rounded-2xl shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative h-64">
                        {restaurant.photos && restaurant.photos[0] && (
                            <img
                                src={`http://localhost:3000${restaurant.photos[0]}`}
                                alt="Restaurant"
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h2 className="text-4xl font-bold text-white">{restaurant.hotelName}</h2>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-orange-100 rounded-lg shadow-sm">
                                <FaStore className="text-orange-500 text-3xl mb-3" />
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-semibold">{restaurant.email}</p>
                            </div>
                            <div className="p-6 bg-orange-100 rounded-lg shadow-sm">
                                <FaMoneyBillWave className="text-orange-500 text-3xl mb-3" />
                                <p className="text-sm text-gray-600">Contact</p>
                                <p className="font-semibold">{restaurant.contact}</p>
                            </div>
                        </div>

                        {/* Wallet Section */}
                        <div className="p-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white shadow-lg">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">Wallet Balance</h3>
                                <FaWallet className="text-3xl" />
                            </div>
                            <p className="text-4xl font-bold mb-6">₹{walletBalance.toFixed(2)}</p>
                            <form onSubmit={handleAddMoney} className="flex gap-4">
                                <input
                                    type="number"
                                    value={amountToAdd}
                                    onChange={(e) => setAmountToAdd(e.target.value)}
                                    placeholder="Amount to add"
                                    className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-400"
                                    min="1"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold shadow hover:bg-orange-50 transition-transform transform hover:scale-105"
                                >
                                    Add Money
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>

                {/* Analytics Section */}
                <motion.div
                    className="lg:col-span-4 space-y-8"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    {/* Daily Stats */}
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <FaChartLine className="mr-3 text-orange-500" />
                            Today's Analytics
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative w-36 h-36 mx-auto">
                                <CircularProgressbar
                                    value={analytics.dailyOrders}
                                    maxValue={100}
                                    text={`${analytics.dailyOrders}`}
                                    styles={buildStyles({
                                        textSize: '24px',
                                        pathColor: '#f97316',
                                        textColor: '#f97316',
                                    })}
                                />
                                <p className="text-center mt-3 text-gray-600">Daily Orders</p>
                            </div>
                            <div className="space-y-6">
                                <div className="p-6 bg-orange-50 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-600">Today's Profit</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        ₹{analytics.dailyBalance}
                                    </p>
                                </div>
                                <div className="p-6 bg-orange-50 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-600">Max Profit/Order</p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        ₹{analytics.maxDailyProfit}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Stats */}
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-2xl"
                        whileHover={{ scale: 1.03 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Weekly Overview</h3>
                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-orange-100 to-orange-300 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-600">Weekly Revenue</p>
                                <p className="text-3xl font-bold text-orange-600">
                                    ₹{analytics.weeklyBalance}
                                </p>
                                <div className="h-3 bg-orange-200 rounded-full mt-3">
                                    <div
                                        className="h-full bg-orange-500 rounded-full"
                                        style={{
                                            width: `${Math.min(
                                                (analytics.weeklyBalance / 10000) * 100,
                                                 100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="p-6 bg-gradient-to-r from-pink-100 to-pink-300 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-600">Orders This Week</p>
                                <p className="text-2xl font-bold text-pink-600">
                                    {analytics.weeklyOrders}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default RestaurantDashboard;
